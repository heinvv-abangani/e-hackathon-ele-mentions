import { Filter, Star } from 'lucide-react';

interface ArchiveWeek {
  year: number;
  iso_week: number;
  label: string;
  current: boolean;
}

interface InsightsArchiveProps {
  weeks: ArchiveWeek[];
}

const InsightsArchive = ({ weeks }: InsightsArchiveProps) => {
  return (
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
          {weeks.map((week, index) => (
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
  );
};

export default InsightsArchive; 