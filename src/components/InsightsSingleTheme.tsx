import { 
  ChevronDown, 
  ChevronUp, 
  Users, 
  MessageSquare, 
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Minus,
  Settings,
  Code,
  Layers,
  Palette,
  BarChart3,
  TrendingUp,
  Zap,
  Calendar,
  Target,
  Filter,
  Star,
  Clock,
  Sparkles
} from 'lucide-react';

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

interface InsightsSingleThemeProps {
  theme: Theme;
  themeIndex: number;
  isExpanded: boolean;
  onToggle: (themeTitle: string) => void;
}

const InsightsSingleTheme = ({ theme, themeIndex, isExpanded, onToggle }: InsightsSingleThemeProps) => {
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

  const IconComponent = getIconComponent(theme.icon);

  return (
    <div
      className={`theme-card group p-8 smooth-appear`}
      style={{ animationDelay: `${themeIndex * 100}ms` }}
    >
      <button
        onClick={() => onToggle(theme.feature)}
        className="w-full flex items-center justify-between mb-6 text-left hover:bg-muted/30 rounded-lg p-2 -m-2 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl hover:scale-110 transition-transform duration-200">
            <IconComponent className={`w-6 h-6 ${theme.color} hover:scale-110 transition-transform duration-200`} />
          </div>
          <h3 className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200">
            {theme.feature}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {theme.subthemes.length} {theme.subthemes.length === 1 ? 'topic' : 'topics'}
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
          {theme.subthemes.map((subTheme, subIndex) => {
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
};

export default InsightsSingleTheme; 