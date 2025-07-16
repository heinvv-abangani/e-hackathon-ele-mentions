import { 
  Zap, 
  Sparkles, 
  Users, 
  Clock, 
  MessageSquare, 
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface EmergingSignal {
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
}

interface InsightsEmergingSignalsProps {
  signals: EmergingSignal[];
}

const InsightsEmergingSignals = ({ signals }: InsightsEmergingSignalsProps) => {
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

  return (
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
          {signals.map((signal, index) => {
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
  );
};

export default InsightsEmergingSignals; 