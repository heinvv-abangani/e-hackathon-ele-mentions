import { useState } from 'react';
import { 
  Calendar, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Zap,
  BarChart3,
  Settings,
  Code,
  Layers,
  Palette,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  Clock,
  Filter,
  Target,
  Sparkles
} from 'lucide-react';
import weekData from '../sample-data/week_28_2025.json';
import GoogleSheetsChart from './GoogleSheetsChart';

interface SubTheme {
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
}

interface Theme {
  feature: string;
  icon: string;
  color: string;
  total_mentions: number;
  avg_sentiment: number;
  subthemes: SubTheme[];
}

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

  const getSentimentBadge = (sentiment: number) => {
    if (sentiment > 0.2) return 'sentiment-positive';
    if (sentiment < -0.2) return 'sentiment-negative';
    return 'sentiment-neutral';
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0.2) return ArrowUp;
    if (sentiment < -0.2) return ArrowDown;
    return Minus;
  };

  const iconMapping: Record<string, React.ElementType> = {
    'Palette': Palette,
    'Settings': Settings,
    'Code': Code,
    'Layers': Layers,
    'BarChart3': BarChart3,
    'TrendingUp': TrendingUp,
    'Users': Users,
    'MessageSquare': MessageSquare,
    'Zap': Zap,
    'Calendar': Calendar,
    'Target': Target,
    'Filter': Filter,
    'Star': Star,
    'Clock': Clock,
    'Sparkles': Sparkles,
    'ExternalLink': ExternalLink
  };

  const getIconComponent = (iconName: string): React.ElementType => {
    return iconMapping[iconName] || Settings;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-content mx-auto px-6 py-12">
        <header className="insights-header relative p-12 mb-section text-center overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BarChart3 className="w-12 h-12 text-primary-foreground pulse-glow" />
              <h1 className="text-6xl font-bold text-primary-foreground tracking-tight">
                Ele-Mentions
              </h1>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Professional insights board delivering weekly product feedback analysis from public sources
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
              <Calendar className="w-5 h-5 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground">
                Editor V4 Alpha — {weekData.week.label}
              </span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 w-24 h-24 bg-primary-foreground/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        </header>

        <section className="mb-section smooth-appear">
          <div className="section-card p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-primary rounded-xl">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Weekly Overview</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
            </div>
            <blockquote className="text-xl leading-relaxed text-muted-foreground pl-8 border-l-4 border-gradient-primary relative">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
              {weekData.overview.summary}
            </blockquote>
          </div>
        </section>

        <GoogleSheetsChart
          title="Analytics Dashboard"
          description="Real-time data visualization from our tracking spreadsheet, automatically updated as new feedback is processed."
          iframeSrc="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiXuMSx6P8x5ycvycy0vQ16IpsNu24gwPH-zwOGXho755qkKRWvBrCqKHe5HBLoWfkC-FNAWZiE2uZ/pubchart?oid=852387257&format=interactive"
        />

        <section className="mb-section">
          <div className="space-y-8">
            {weekData.features_discussed.map((feature, themeIndex) => {
              const IconComponent = getIconComponent(feature.icon);
              const isExpanded = expandedThemes.has(feature.feature);
              
              return (
                 <div
                   key={feature.feature}
                   className={`theme-card group p-8 smooth-appear`}
                   style={{ animationDelay: `${themeIndex * 100}ms` }}
                 >
                  <button
                    onClick={() => toggleTheme(feature.feature)}
                    className="w-full flex items-center justify-between mb-6 text-left hover:bg-muted/30 rounded-lg p-2 -m-2 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl hover:scale-110 transition-transform duration-200">
                        <IconComponent className={`w-6 h-6 ${feature.color} hover:scale-110 transition-transform duration-200`} />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200">
                        {feature.feature}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {feature.subthemes.length} {feature.subthemes.length === 1 ? 'topic' : 'topics'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="space-y-8 transition-all duration-300 ease-in-out animate-fade-in">
                      {feature.subthemes.map((subTheme, subIndex) => {
                        const SentimentIcon = getSentimentIcon(subTheme.sentiment);
                        
                        return (
                          <div key={subIndex} className="relative pl-8 border-l-2 border-gradient-to-b from-primary/20 to-accent/20">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-primary rounded-full"></div>
                            
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <h4 className="text-xl font-semibold text-foreground">{subTheme.title}</h4>
                              <span className={`sentiment-badge ${getSentimentBadge(subTheme.sentiment)}`}>
                                <Users className="w-4 h-4" />
                                {subTheme.mentions} mentions
                              </span>
                              <span className={`sentiment-badge ${getSentimentBadge(subTheme.sentiment)}`}>
                                <SentimentIcon className="w-4 h-4" />
                                {subTheme.sentiment > 0 ? '+' : ''}{subTheme.sentiment.toFixed(1)}
                              </span>
                            </div>
                            
                            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                              {subTheme.description}
                            </p>

                            {subTheme.quotes.length > 0 && (
                              <div className="space-y-3 mb-6">
                                {subTheme.quotes.map((quote, quoteIndex) => (
                                  <div key={quoteIndex} className="quote-block floating-element">
                                    <MessageSquare className="w-5 h-5 text-primary inline mr-3" />
                                    {quote.text}
                                  </div>
                                ))}
                              </div>
                            )}

                            {subTheme.sources.length > 0 && (
                              <div className="flex flex-wrap gap-4">
                                {subTheme.sources.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link.url}
                                    className="link-modern"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    {link.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-section">
          <div className="section-card-alt p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-accent rounded-xl pulse-glow">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Emerging Signals</h2>
              <span className="px-4 py-2 bg-gradient-accent rounded-full text-accent-foreground text-sm font-bold shadow-lg">
                <Sparkles className="w-4 h-4 inline mr-2" />
                New This Week
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
            </div>
            
            <div className="space-y-8">
              {weekData.emerging_signals.map((signal, index) => {
                const SentimentIcon = getSentimentIcon(signal.sentiment);
                
                return (
                  <div key={index} className="emerging-signal">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h4 className="text-xl font-semibold text-foreground">{signal.title}</h4>
                      <span className={`sentiment-badge ${getSentimentBadge(signal.sentiment)}`}>
                        <Users className="w-4 h-4" />
                        {signal.mentions} mentions
                      </span>
                      {signal.first_surfaced_this_week && (
                        <span className="px-3 py-1.5 bg-accent/10 text-accent-foreground text-xs font-bold rounded-full border border-accent/20">
                          <Clock className="w-3 h-3 inline mr-1" />
                          First surfaced this week
                        </span>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                      {signal.description}
                    </p>

                    {signal.quotes.length > 0 && (
                      <div className="space-y-3">
                        {signal.quotes.map((quote, quoteIndex) => (
                          <div key={quoteIndex} className="quote-block floating-element">
                            <MessageSquare className="w-5 h-5 text-primary inline mr-3" />
                            {quote.text}
                          </div>
                        ))}
                      </div>
                    )}

                    {signal.sources && signal.sources.length > 0 && (
                      <div className="flex flex-wrap gap-4 mt-6">
                        {signal.sources.map((source, sourceIndex) => (
                          <a
                            key={sourceIndex}
                            href={source.url}
                            className="link-modern"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {source.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-section">
          <div className="section-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl">
                <Filter className="w-6 h-6 text-neutral-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Archive</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
            </div>
            <div className="flex flex-wrap gap-3">
              {weekData.archive_weeks.map((week, index) => (
                <button
                  key={index}
                  className={`archive-button ${
                    week.current
                      ? 'archive-button-active'
                      : 'archive-button-inactive'
                  }`}
                >
                  {week.current && <Star className="w-4 h-4 mr-2" />}
                  {week.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InsightsBoard;