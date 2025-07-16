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

interface SubTheme {
  title: string;
  mentions: number;
  sentiment: number;
  description: string;
  quotes: string[];
  links: Array<{
    text: string;
    url: string;
  }>;
}

interface Theme {
  title: string;
  icon: React.ElementType;
  color: string;
  subThemes: SubTheme[];
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

  const themes: Theme[] = [
    {
      title: "Styling System",
      icon: Palette,
      color: "text-blue-600",
      subThemes: [
        {
          title: "Obfuscated Class Names Frustrate Developers",
          mentions: 5,
          sentiment: -0.7,
          description: "The shift to a class-based styling system is widely seen as the right direction, but developers are pushing back hard on Elementor's use of random obfuscated class names in the frontend. The inability to target or understand generated selectors breaks familiar debugging flows and limits extensibility.",
          quotes: [
            "I pray and hope Elementor… please do not let this be the case.",
            "This alone makes it harder than Bricks.",
            "I can't debug this easily — I need to know what class I'm working with."
          ],
          links: [
            { text: "Watch creator at 13:41", url: "#" },
            { text: "Reddit: 'This breaks my workflow' thread", url: "#" }
          ]
        },
        {
          title: "Global Class Edits Are a Hit",
          mentions: 3,
          sentiment: 0.6,
          description: "Despite the frustration with naming, the concept of reusable global classes is landing well. Creators highlight how changing a class updates all elements instantly — a shift toward scalable design systems.",
          quotes: [
            "This is how it should've always worked.",
            "Feels like a proper builder now."
          ],
          links: []
        }
      ]
    },
    {
      title: "UI & Workflow",
      icon: Settings,
      color: "text-purple-600",
      subThemes: [
        {
          title: "Spacing Controls Are Visually Confusing",
          mentions: 4,
          sentiment: -0.6,
          description: "The current layout of padding/margin controls is drawing criticism. Inputs are arranged horizontally, breaking users' spatial intuition for top/left/right/bottom. The linking icon is subtle to the point of invisibility.",
          quotes: [
            "Left padding input on the right? Really?",
            "I didn't even realize the spacing was linked.",
            "This layout makes no visual sense."
          ],
          links: [
            { text: "UX walk-through breakdown", url: "#" }
          ]
        },
        {
          title: "Simplified Two-Tab UI Gets Praise",
          mentions: 3,
          sentiment: 0.7,
          description: "Reviewers like the move to a consistent two-tab interface: \"General\" and \"Style.\" It's perceived as cleaner and less overwhelming than the mixed-tab model of Editor V3.",
          quotes: [
            "It feels like a UI reset — in a good way.",
            "Finally, some consistency."
          ],
          links: []
        }
      ]
    },
    {
      title: "Missing Features",
      icon: Layers,
      color: "text-orange-600",
      subThemes: [
        {
          title: "Variables Remain the Most Requested",
          mentions: 8,
          sentiment: -0.8,
          description: "For the third week in a row, variables are the most talked-about missing feature. Creators repeatedly expected them to ship with the alpha, especially given the class-based foundation. The lack of design tokens is limiting early adoption.",
          quotes: [
            "We're designing blind without variables.",
            "Feels incomplete. Like the foundation is there, but the roof's missing.",
            "Every time I go to create a color class, I remember I can't."
          ],
          links: [
            { text: "Watch creator feedback at 08:12", url: "#" }
          ]
        }
      ]
    },
    {
      title: "Developer Experience",
      icon: Code,
      color: "text-green-600",
      subThemes: [
        {
          title: "No Access to Add Custom Class Names",
          mentions: 3,
          sentiment: -0.6,
          description: "Multiple creators noted the inability to assign custom class names or IDs to atomic elements. While the system supports reusable classes, the missing input field blocks workflows involving third-party frameworks or semantic structure.",
          quotes: [
            "Where's the field? I just want to add my own class.",
            "This matters if you're working with anything external.",
            "You can't even set an ID? That's a problem."
          ],
          links: []
        }
      ]
    }
  ];

  const emergingSignals: SubTheme[] = [
    {
      title: "SVG Widget Frustration Spikes",
      mentions: 4,
      sentiment: -0.5,
      description: "The SVG widget drew heat this week for lacking any icon library or inline support. Users expected to browse assets like Font Awesome. Instead, they're told to upload SVGs manually — a jarring experience for many.",
      quotes: [
        "No icon library? Really?",
        "Why would I upload files for something every builder has built-in?"
      ],
      links: []
    },
    {
      title: "Typography Inheritance Issues",
      mentions: 2,
      sentiment: -0.4,
      description: "A few creators noticed that child elements — especially headings — aren't inheriting font weights and sizes correctly from container styles.",
      quotes: [
        "My H2 isn't picking up the container's font weight.",
        "It looks like styles are breaking on cascade."
      ],
      links: []
    }
  ];

  const archiveWeeks = [
    { label: "Week of July 7–14", current: true },
    { label: "Week of June 30–July 6", current: false },
    { label: "Week of June 23–29", current: false },
    { label: "Week of June 16–22", current: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-content mx-auto px-6 py-12">
        {/* Enhanced Header */}
        <header className="insights-header relative p-12 mb-section text-center overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BarChart3 className="w-12 h-12 text-primary-foreground pulse-glow" />
              <h1 className="text-6xl font-bold text-primary-foreground tracking-tight">
                Ele-Mentions test
              </h1>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Professional insights board delivering weekly product feedback analysis from public sources
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
              <Calendar className="w-5 h-5 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground">
                Editor V4 Alpha — Week of July 7–14
              </span>
            </div>
          </div>
          
          {/* Floating decoration elements */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-primary-foreground/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        </header>

        {/* Weekly Overview with modern styling */}
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
              This week's conversation around Editor V4 feels like a turning point. Users are no longer evaluating potential — they're testing trust. There's genuine excitement about the code output and styling foundations, but it's tempered by repeated frustrations: missing features, unintuitive UI behavior, and friction points that feel like they shouldn't still be there.
            </blockquote>
          </div>
        </section>

        {/* Enhanced Themes Section */}
        <section className="mb-section">
          <div className="space-y-8">
            {themes.map((theme, themeIndex) => {
              const IconComponent = theme.icon;
              const isExpanded = expandedThemes.has(theme.title);
              
              return (
                 <div
                   key={theme.title}
                   className={`theme-card group p-8 smooth-appear`}
                   style={{ animationDelay: `${themeIndex * 100}ms` }}
                 >
                  <button
                    onClick={() => toggleTheme(theme.title)}
                    className="w-full flex items-center justify-between mb-6 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl group-hover:scale-110 transition-transform duration-200">
                        <IconComponent className={`w-6 h-6 ${theme.color} group-hover:scale-110 transition-transform duration-200`} />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                        {theme.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {theme.subThemes.length} {theme.subThemes.length === 1 ? 'topic' : 'topics'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="space-y-8 animate-in slide-in-from-top-2 duration-300">
                      {theme.subThemes.map((subTheme, subIndex) => {
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
                                    {quote}
                                  </div>
                                ))}
                              </div>
                            )}

                            {subTheme.links.length > 0 && (
                              <div className="flex flex-wrap gap-4">
                                {subTheme.links.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link.url}
                                    className="link-modern"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    {link.text}
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

        {/* Enhanced Emerging Signals */}
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
              {emergingSignals.map((signal, index) => {
                const SentimentIcon = getSentimentIcon(signal.sentiment);
                
                return (
                  <div key={index} className="emerging-signal">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h4 className="text-xl font-semibold text-foreground">{signal.title}</h4>
                      <span className={`sentiment-badge ${getSentimentBadge(signal.sentiment)}`}>
                        <Users className="w-4 h-4" />
                        {signal.mentions} mentions
                      </span>
                      <span className="px-3 py-1.5 bg-accent/10 text-accent-foreground text-xs font-bold rounded-full border border-accent/20">
                        <Clock className="w-3 h-3 inline mr-1" />
                        First surfaced this week
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                      {signal.description}
                    </p>

                    {signal.quotes.length > 0 && (
                      <div className="space-y-3">
                        {signal.quotes.map((quote, quoteIndex) => (
                          <div key={quoteIndex} className="quote-block floating-element">
                            <MessageSquare className="w-5 h-5 text-primary inline mr-3" />
                            {quote}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Archive Navigation */}
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
              {archiveWeeks.map((week, index) => (
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