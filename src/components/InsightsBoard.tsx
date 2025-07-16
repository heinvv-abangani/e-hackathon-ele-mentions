import { useState } from 'react';
import weekData from '../sample-data/week_28_2025.json';
import GoogleSheetsChart from './GoogleSheetsChart';
import InsightsHeader from './InsightsHeader';
import InsightsSummary from './InsightsSummary';
import InsightsSingleTheme from './InsightsSingleTheme';
import InsightsEmergingSignals from './InsightsEmergingSignals';
import InsightsArchive from './InsightsArchive';


const InsightsBoard = () => {
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(new Set(['Styling System']));

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

        <InsightsSummary
          title="Weekly Overview"
          summary={weekData.overview.summary}
        />

        <GoogleSheetsChart
          title="Analytics Dashboard"
          description="Real-time data visualization from our tracking spreadsheet, automatically updated as new feedback is processed."
          iframeSrc="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiXuMSx6P8x5ycvycy0vQ16IpsNu24gwPH-zwOGXho755qkKRWvBrCqKHe5HBLoWfkC-FNAWZiE2uZ/pubchart?oid=852387257&format=interactive"
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
      </div>
    </div>
  );
};

export default InsightsBoard;