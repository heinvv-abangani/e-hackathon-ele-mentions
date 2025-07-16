import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoogleSheetsChartProps {
  title: string;
  description?: string;
  iframeSrc: string;
  width?: number;
  height?: number;
}

const GoogleSheetsChart = ({ 
  title,
  description,
  iframeSrc,
  width = 911,
  height = 455
}: GoogleSheetsChartProps) => {
  const [key, setKey] = useState(0);

  const refreshChart = () => {
    setKey(prev => prev + 1);
  };

  return (
    <section className="mb-section smooth-appear">
      <div className="section-card p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <BarChart3 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshChart}
            className="hover:bg-muted/50"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        
        {description && (
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {description}
          </p>
        )}

        <div className="bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border/50 overflow-hidden">
          <iframe
            key={key}
            width="100%"
            height="400"
            seamless
            frameBorder="0"
            scrolling="no"
            src={iframeSrc}
            className="w-full block"
            title={title}
          />
        </div>
      </div>
    </section>
  );
};

export default GoogleSheetsChart; 