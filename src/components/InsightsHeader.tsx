import { BarChart3, Calendar } from 'lucide-react';

interface InsightsHeaderProps {
  title: string;
  description: string;
  weekLabel: string;
}

const InsightsHeader = ({ title, description, weekLabel }: InsightsHeaderProps) => {
  return (
    <header className="insights-header relative p-12 mb-section text-center overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <BarChart3 className="w-12 h-12 text-primary-foreground pulse-glow" />
          <h1 className="text-6xl font-bold text-primary-foreground tracking-tight">
            {title}
          </h1>
        </div>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
          <Calendar className="w-5 h-5 text-primary-foreground" />
          <span className="text-sm font-semibold text-primary-foreground">
            Editor V4 Alpha — {weekLabel}
          </span>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 w-24 h-24 bg-primary-foreground/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-700"></div>
    </header>
  );
};

export default InsightsHeader; 