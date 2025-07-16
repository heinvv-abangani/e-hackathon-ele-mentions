import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Sample data for all examples
const SAMPLE_TABS = [
  { key: 'insights', label: 'Weekly insights' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'analytics', label: 'Analytics' },
];

export const TabStyleOptions = () => {
  return (
    <div className="space-y-12 p-8">
      
      {/* Style 1: Modern Gradient Pills */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Style 1: Modern Gradient Pills</h3>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-1 bg-gradient-subtle rounded-xl border border-border shadow-sm">
            {SAMPLE_TABS.map(tab => (
              <TabsTrigger 
                key={tab.key}
                value={tab.key} 
                className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-medium transition-all duration-200 hover:scale-105"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="insights" className="mt-4">Content for insights</TabsContent>
          <TabsContent value="dashboard" className="mt-4">Content for dashboard</TabsContent>
          <TabsContent value="analytics" className="mt-4">Content for analytics</TabsContent>
        </Tabs>
      </div>

      {/* Style 2: Underlined Minimal */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Style 2: Underlined Minimal</h3>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="bg-transparent border-b border-border p-0 h-auto justify-start rounded-none">
            {SAMPLE_TABS.map(tab => (
              <TabsTrigger 
                key={tab.key}
                value={tab.key} 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 font-medium text-muted-foreground data-[state=active]:text-primary hover:text-primary/80 transition-all duration-200"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="insights" className="mt-4">Content for insights</TabsContent>
          <TabsContent value="dashboard" className="mt-4">Content for dashboard</TabsContent>
          <TabsContent value="analytics" className="mt-4">Content for analytics</TabsContent>
        </Tabs>
      </div>

      {/* Style 3: Floating Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Style 3: Floating Cards</h3>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="bg-transparent p-0 h-auto gap-2 justify-start">
            {SAMPLE_TABS.map(tab => (
              <TabsTrigger 
                key={tab.key}
                value={tab.key} 
                className="rounded-xl border border-border bg-card hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg px-6 py-3 font-medium transition-all duration-200 hover:scale-105 data-[state=active]:scale-105"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="insights" className="mt-4">Content for insights</TabsContent>
          <TabsContent value="dashboard" className="mt-4">Content for dashboard</TabsContent>
          <TabsContent value="analytics" className="mt-4">Content for analytics</TabsContent>
        </Tabs>
      </div>

      {/* Style 4: Segmented Control */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Style 4: Segmented Control</h3>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="inline-flex p-1 bg-muted rounded-lg border border-border">
            {SAMPLE_TABS.map(tab => (
              <TabsTrigger 
                key={tab.key}
                value={tab.key} 
                className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-4 py-2 font-medium text-sm transition-all duration-150"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="insights" className="mt-4">Content for insights</TabsContent>
          <TabsContent value="dashboard" className="mt-4">Content for dashboard</TabsContent>
          <TabsContent value="analytics" className="mt-4">Content for analytics</TabsContent>
        </Tabs>
      </div>

      {/* Style 5: Glass Effect */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Style 5: Glass Effect</h3>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-1 shadow-lg">
            {SAMPLE_TABS.map(tab => (
              <TabsTrigger 
                key={tab.key}
                value={tab.key} 
                className="rounded-xl data-[state=active]:bg-background/80 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-md px-6 py-3 font-medium transition-all duration-200 hover:bg-background/40"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="insights" className="mt-4">Content for insights</TabsContent>
          <TabsContent value="dashboard" className="mt-4">Content for dashboard</TabsContent>
          <TabsContent value="analytics" className="mt-4">Content for analytics</TabsContent>
        </Tabs>
      </div>

      {/* Style 6: Custom Button Style (Current Style Enhanced) */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Style 6: Custom Button Style (Enhanced Current)</h3>
        <div className="mb-8 flex gap-2 border-b border-border">
          {SAMPLE_TABS.map(tab => (
            <Button
              key={tab.key}
              variant="ghost"
              className="px-6 py-3 text-lg font-semibold rounded-t-xl transition-all duration-200 border-x border-t border-transparent hover:border-border hover:bg-gradient-subtle data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-border data-[state=active]:border-b-0 data-[state=active]:-mb-px"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Style 7: Accent Gradient */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Style 7: Accent Gradient</h3>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="bg-gradient-accent rounded-xl p-1 shadow-lg">
            {SAMPLE_TABS.map(tab => (
              <TabsTrigger 
                key={tab.key}
                value={tab.key} 
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg px-6 py-3 font-medium text-white/90 data-[state=active]:text-foreground transition-all duration-200 hover:bg-white/10"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="insights" className="mt-4">Content for insights</TabsContent>
          <TabsContent value="dashboard" className="mt-4">Content for dashboard</TabsContent>
          <TabsContent value="analytics" className="mt-4">Content for analytics</TabsContent>
        </Tabs>
      </div>

      {/* Style 8: Bordered Buttons */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Style 8: Bordered Buttons</h3>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="bg-transparent p-0 h-auto gap-3 justify-start">
            {SAMPLE_TABS.map(tab => (
              <TabsTrigger 
                key={tab.key}
                value={tab.key} 
                className="rounded-lg border-2 border-border bg-transparent hover:border-primary/50 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 font-medium transition-all duration-200 hover:scale-105"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="insights" className="mt-4">Content for insights</TabsContent>
          <TabsContent value="dashboard" className="mt-4">Content for dashboard</TabsContent>
          <TabsContent value="analytics" className="mt-4">Content for analytics</TabsContent>
        </Tabs>
      </div>

    </div>
  );
};