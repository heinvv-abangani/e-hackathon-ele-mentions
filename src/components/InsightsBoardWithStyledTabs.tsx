import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import weekData from '../sample-data/week_28_2025.json';
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

const InsightsBoardWithStyledTabs = () => {
  const firstTheme = weekData.features_discussed[0]?.feature;
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(
    firstTheme ? new Set([firstTheme]) : new Set()
  );

  const toggleTheme = (themeTitle: string) => {
    const newExpanded = new Set(expandedThemes);
    if (newExpanded.has(themeTitle)) {
      newExpanded.delete(themeTitle);
    } else {
      newExpanded.add(themeTitle);
    }
    setExpandedThemes(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-content mx-auto px-6 py-12">
        <InsightsHeader
          title="Ele-Mentions"
          description="Professional insights board delivering weekly product feedback analysis from public sources"
          weekLabel={weekData.week.label}
        />

        {/* Replace with any of the 8 styles from TabStyleOptions */}
        {/* Style 1: Modern Gradient Pills */}
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
              summary={weekData.overview.summary}
            />
            <section className="mb-section">
              <div className="space-y-8">
                {weekData.features_discussed.map((feature, themeIndex) => (
                  <InsightsSingleTheme
                    key={feature.feature}
                    theme={feature}
                    themeIndex={themeIndex}
                    isExpanded={expandedThemes.has(feature.feature)}
                    onToggle={toggleTheme}
                  />
                ))}
              </div>
            </section>
            <InsightsEmergingSignals signals={weekData.emerging_signals} />
            <InsightsArchive weeks={weekData.archive_weeks} />
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