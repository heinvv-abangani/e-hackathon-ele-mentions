import { Target } from 'lucide-react';

interface InsightsSummaryProps {
  title: string;
  summary: string;
}

const InsightsSummary = ({ title, summary }: InsightsSummaryProps) => {
  return (
    <section className="mb-section smooth-appear">
      <div className="section-card p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <Target className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
        </div>
        <blockquote className="text-xl leading-relaxed text-muted-foreground pl-8 border-l-4 border-gradient-primary relative">
          <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
          {summary}
        </blockquote>
      </div>
    </section>
  );
};

export default InsightsSummary; 