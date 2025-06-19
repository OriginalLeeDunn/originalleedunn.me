import { cn } from '@/lib/utils';

const colorGroups = [
  {
    name: 'Primary',
    colors: [
      { name: 'Primary', value: 'hsl(var(--primary))' },
      { name: 'Primary Foreground', value: 'hsl(var(--primary-foreground))' },
    ],
  },
  {
    name: 'Accent',
    colors: [
      { name: 'Accent', value: 'hsl(var(--accent))' },
      { name: 'Accent Foreground', value: 'hsl(var(--accent-foreground))' },
    ],
  },
  {
    name: 'Destructive',
    colors: [
      { name: 'Destructive', value: 'hsl(var(--destructive))' },
      { name: 'Destructive Foreground', value: 'hsl(var(--destructive-foreground))' },
    ],
  },
  {
    name: 'Background & Foreground',
    colors: [
      { name: 'Background', value: 'hsl(var(--background))' },
      { name: 'Foreground', value: 'hsl(var(--foreground))' },
    ],
  },
  {
    name: 'Muted',
    colors: [
      { name: 'Muted', value: 'hsl(var(--muted))' },
      { name: 'Muted Foreground', value: 'hsl(var(--muted-foreground))' },
    ],
  },
  {
    name: 'Border & Input',
    colors: [
      { name: 'Border', value: 'hsl(var(--border))' },
      { name: 'Input', value: 'hsl(var(--input))' },
    ],
  },
  {
    name: 'Brand Colors',
    colors: [
      { name: 'Brand Primary', value: 'hsl(var(--brand-primary))' },
      { name: 'Brand Secondary', value: 'hsl(var(--brand-secondary))' },
      { name: 'Brand Accent', value: 'hsl(var(--brand-accent))' },
    ],
  },
];

export function ColorsDemo() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Color Palette</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colorGroups.map((group) => (
            <div key={group.name} className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">{group.name}</h3>
              <div className="space-y-2">
                {group.colors.map((color) => (
                  <div key={color.name} className="flex items-center">
                    <div
                      className="mr-3 h-10 w-10 rounded-md border"
                      style={{
                        backgroundColor: color.value,
                        borderColor: 'hsl(var(--border))',
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium">{color.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {color.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Gradients</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Primary Gradient</h3>
            <div className="h-32 rounded-lg bg-gradient-to-r from-primary to-accent" />
            <div className="text-xs text-muted-foreground font-mono">
              bg-gradient-to-r from-primary to-accent
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Brand Gradient</h3>
            <div className="h-32 rounded-lg bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary" />
            <div className="text-xs text-muted-foreground font-mono">
              bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Usage in CSS</h2>
        <pre className="rounded-lg bg-muted p-4 text-sm">
          <code className="font-mono">
            {`/* Using CSS variables */
.button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

/* Using Tailwind classes */
<div className="bg-background text-foreground">
  Content
</div>

/* Using gradients */
.gradient-text {
  @apply bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent;
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
