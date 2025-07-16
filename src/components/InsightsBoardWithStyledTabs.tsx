import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GoogleSheetsChart from './GoogleSheetsChart';
import InsightsHeader from './InsightsHeader';
import InsightsSummary from './InsightsSummary';
import InsightsSingleTheme from './InsightsSingleTheme';
import InsightsEmergingSignals from './InsightsEmergingSignals';
import InsightsArchive from './InsightsArchive';

const TABS = [
  { key: 'insights', label: 'Weekly insights' },
  { key: 'dashboard', label: 'Dashboard' },
];

// API configuration
const API_BASE_URL = 'http://localhost:5000';

interface WeekData {
  week: {
    year: number;
    iso_week: number;
    date_range: {
      start: string;
      end: string;
    };
    label: string;
  };
  overview: {
    summary: string;
    total_entries: number;
    total_mentions: number;
    avg_sentiment: number;
  };
  features_discussed: Array<{
    feature: string;
    icon: string;
    color: string;
    total_mentions: number;
    avg_sentiment: number;
    subthemes: Array<{
      title: string;
      mentions: number;
      sentiment: number;
      description: string;
      quotes: Array<{
        text: string;
        relevance_score: number;
        entry_id: string;
      }>;
      sources: Array<{
        title: string;
        url: string;
        type: string;
        timestamp?: string;
      }>;
    }>;
  }>;
  emerging_signals: Array<{
    title: string;
    mentions: number;
    sentiment: number;
    description: string;
    first_surfaced_this_week: boolean;
    quotes: Array<{
      text: string;
      relevance_score: number;
      entry_id: string;
    }>;
    sources: Array<{
      title: string;
      url: string;
      type: string;
    }>;
  }>;
  archive_weeks: Array<{
    year: number;
    iso_week: number;
    label: string;
    current: boolean;
  }>;
}

// API service
const api = {
  async generateAnalysis(timeWindow: { start: string; end: string }) {
    const response = await fetch(`${API_BASE_URL}/api/analysis/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ time_window: timeWindow }),
    });
    
    if (!response.ok) {
      throw new Error(`Analysis generation failed: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getAnalysisStatus(sessionId: string) {
    const response = await fetch(`${API_BASE_URL}/api/analysis/${sessionId}/status?include_analysis=true`);
    
    if (!response.ok) {
      throw new Error(`Status check failed: ${response.statusText}`);
    }
    
    return response.json();
  }
};

// Helper to get current week's time window
const getCurrentWeekTimeWindow = () => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
  endOfWeek.setHours(23, 59, 59, 999);
  
  return {
    start: startOfWeek.toISOString(),
    end: endOfWeek.toISOString()
  };
};

const InsightsBoardWithStyledTabs = () => {
  const [weekData, setWeekData] = useState<WeekData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<string>('idle');

  const firstTheme = weekData?.features_discussed?.[0]?.feature;
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(
    firstTheme ? new Set([firstTheme]) : new Set()
  );

  // Load analysis data
  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);
        setAnalysisStatus('generating');
        
        console.log('🚀 Starting analysis generation...');
        
        // Get current week's time window
        const timeWindow = getCurrentWeekTimeWindow();
        
        // Generate analysis
        const generateResponse = await api.generateAnalysis(timeWindow);
        const sessionId = generateResponse.data.sessionId;
        
        console.log('📊 Analysis session created:', sessionId);
        
        // Poll for completion
        let attempts = 0;
        const maxAttempts = 30; // 30 seconds timeout
        
        while (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          
          const statusResponse = await api.getAnalysisStatus(sessionId);
          const status = statusResponse.data.status;
          
          console.log(`📊 Analysis status (${attempts + 1}/${maxAttempts}):`, status);
          setAnalysisStatus(status);
          
          if (status === 'completed') {
            let analysisData = statusResponse.data.analysis;
            
            console.log('✅ Analysis completed, parsing data...');
            
            // Parse JSON if it's a string
            if (typeof analysisData === 'string') {
              try {
                const jsonMatch = analysisData.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  const parsedData = JSON.parse(jsonMatch[0]);
                  setWeekData(parsedData);
                  console.log('✅ Analysis data loaded successfully');
                  break;
                } else {
                  throw new Error('No JSON found in analysis response');
                }
              } catch (parseError) {
                console.error('❌ Failed to parse analysis JSON:', parseError);
                setError('Failed to parse analysis data');
                break;
              }
            } else {
              // Already parsed JSON
              setWeekData(analysisData);
              console.log('✅ Analysis data loaded successfully');
              break;
            }
          } else if (status === 'failed') {
            throw new Error('Analysis generation failed');
          }
          
          attempts++;
        }
        
        if (attempts >= maxAttempts) {
          throw new Error('Analysis generation timed out');
        }
        
      } catch (err) {
        console.error('❌ Analysis loading error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load analysis');
      } finally {
        setLoading(false);
      }
    };

    loadAnalysis();
  }, []);

  // Update expanded themes when data loads
  useEffect(() => {
    if (weekData?.features_discussed?.[0]?.feature) {
      setExpandedThemes(new Set([weekData.features_discussed[0].feature]));
    }
  }, [weekData]);

  const toggleTheme = (themeTitle: string) => {
    const newExpanded = new Set(expandedThemes);
    if (newExpanded.has(themeTitle)) {
      newExpanded.delete(themeTitle);
    } else {
      newExpanded.add(themeTitle);
    }
    setExpandedThemes(newExpanded);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-content mx-auto px-6 py-12">
          <div className="text-center">
            <div className="animate-pulse mb-8">
              <div className="h-16 bg-gradient-primary rounded-2xl mb-4 opacity-20"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-2/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-border">
              <div className="flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Generating Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Status: <span className="font-medium capitalize">{analysisStatus}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Processing social media feedback and generating insights...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-content mx-auto px-6 py-12">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Analysis Failed</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!weekData) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-content mx-auto px-6 py-12">
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Data Available</h3>
              <p className="text-yellow-700">No analysis data was generated. Please ensure there's processed feedback data available.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-content mx-auto px-6 py-12">
        <InsightsHeader
          title="Ele-Mentions"
          description="Professional insights board delivering weekly product feedback analysis from public sources"
          weekLabel={weekData.week?.label || 'Current Week'}
        />

        <Tabs defaultValue="insights" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-gradient-subtle rounded-xl border border-border shadow-sm">
            {TABS.map(tab => (
              <TabsTrigger 
                key={tab.key}
                value={tab.key} 
                className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-medium transition-all duration-200 hover:scale-105"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="insights" className="mt-8">
            <InsightsSummary
              title="Weekly Overview"
              summary={weekData.overview?.summary || 'No summary available'}
            />
            <section className="mb-section">
              <div className="space-y-8">
                {weekData.features_discussed?.map((feature, themeIndex) => (
                  <InsightsSingleTheme
                    key={feature.feature}
                    theme={feature}
                    themeIndex={themeIndex}
                    isExpanded={expandedThemes.has(feature.feature)}
                    onToggle={toggleTheme}
                  />
                )) || (
                  <div className="text-center py-8 text-muted-foreground">
                    No features discussed this week
                  </div>
                )}
              </div>
            </section>
            <InsightsEmergingSignals signals={weekData.emerging_signals || []} />
            <InsightsArchive weeks={weekData.archive_weeks || []} />
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-8">
            <GoogleSheetsChart
              title="Analytics Dashboard"
              description="Real-time data visualization from our tracking spreadsheet, automatically updated as new feedback is processed."
              iframeSrc="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiXuMSx6P8x5ycvycy0vQ16IpsNu24gwPH-zwOGXho755qkKRWvBrCqKHe5HBLoWfkC-FNAWZiE2uZ/pubchart?oid=852387257&format=interactive"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InsightsBoardWithStyledTabs;