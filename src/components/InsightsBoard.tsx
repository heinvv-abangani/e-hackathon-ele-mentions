import { useState } from 'react';
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

const InsightsBoard = () => {
  const firstTheme = weekData.features_discussed[0]?.feature;
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(
    firstTheme ? new Set([firstTheme]) : new Set()
  );
  const [activeTab, setActiveTab] = useState('insights');

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

        <div className="mb-8 flex gap-2 border-b border-border">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`px-6 py-2 text-lg font-semibold rounded-t-lg transition-colors duration-200 focus:outline-none ${
                activeTab === tab.key
                  ? 'bg-background text-primary border-x border-t border-border border-b-0 -mb-px'
                  : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' ? (
          <GoogleSheetsChart
            title="Analytics Dashboard"
            description="Real-time data visualization from our tracking spreadsheet, automatically updated as new feedback is processed."
            iframeSrc="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiXuMSx6P8x5ycvycy0vQ16IpsNu24gwPH-zwOGXho755qkKRWvBrCqKHe5HBLoWfkC-FNAWZiE2uZ/pubchart?oid=852387257&format=interactive"
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default InsightsBoard;