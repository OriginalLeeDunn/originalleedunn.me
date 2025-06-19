import { cn } from '@/lib/utils';

const typography = [
  {
    name: 'Display Large',
    class: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    example: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Display Small',
    class: 'text-3xl font-bold tracking-tight',
    example: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Heading 1',
    class: 'scroll-m-20 text-4xl font-bold tracking-tight',
    example: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Heading 2',
    class: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
    example: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Heading 3',
    class: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    example: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Heading 4',
    class: 'scroll-m-20 text-xl font-semibold tracking-tight',
    example: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Paragraph',
    class: 'leading-7 [&:not(:first-child)]:mt-6',
    example: 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.',
  },
  {
    name: 'Lead',
    class: 'text-xl text-muted-foreground',
    example: 'A lead paragraph that stands out with a larger font size and lighter color.',
  },
  {
    name: 'Large',
    class: 'text-lg font-semibold',
    example: 'Large text for emphasis',
  },
  {
    name: 'Small',
    class: 'text-sm font-medium leading-none',
    example: 'Small text for less emphasis',
  },
  {
    name: 'Muted',
    class: 'text-sm text-muted-foreground',
    example: 'Muted text for secondary content',
  },
  {
    name: 'Blockquote',
    class: 'mt-6 border-l-2 pl-6 italic',
    example: 'A well-known quote, contained in a blockquote element.',
  },
  {
    name: 'List',
    class: 'my-6 ml-6 list-disc [&>li]:mt-2',
    example: '',
    isList: true,
  },
  {
    name: 'Code',
    class: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    example: 'npm install',
  },
];

export function TypographyDemo() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Type Scale</h2>
        <div className="space-y-12">
          {typography.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">{item.name}</div>
              <div 
                className={cn(
                  item.class,
                  'text-foreground',
                  item.name.toLowerCase().includes('muted') && 'text-muted-foreground',
                )}
              >
                {item.isList ? (
                  <ul className={item.class}>
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                  </ul>
                ) : (
                  item.example
                )}
              </div>
              <div className="mt-2">
                <code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {item.class}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Font Weights</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Thin', class: 'font-thin' },
            { name: 'Extra Light', class: 'font-extralight' },
            { name: 'Light', class: 'font-light' },
            { name: 'Normal', class: 'font-normal' },
            { name: 'Medium', class: 'font-medium' },
            { name: 'Semibold', class: 'font-semibold' },
            { name: 'Bold', class: 'font-bold' },
            { name: 'Extra Bold', class: 'font-extrabold' },
            { name: 'Black', class: 'font-black' },
          ].map((weight) => (
            <div key={weight.name} className="space-y-2">
              <div className="text-sm text-muted-foreground">{weight.name}</div>
              <div className={cn('text-lg', weight.class)}>
                The quick brown fox
              </div>
              <code className="block text-xs text-muted-foreground">
                {weight.class}
              </code>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Text Colors</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Default', class: 'text-foreground' },
            { name: 'Muted', class: 'text-muted-foreground' },
            { name: 'Primary', class: 'text-primary' },
            { name: 'Primary Foreground', class: 'text-primary-foreground bg-primary p-1' },
            { name: 'Destructive', class: 'text-destructive' },
            { name: 'Destructive Foreground', class: 'text-destructive-foreground bg-destructive p-1' },
          ].map((color) => (
            <div key={color.name} className="space-y-2">
              <div className="text-sm text-muted-foreground">{color.name}</div>
              <div className={cn('rounded-md p-2', color.class)}>
                The quick brown fox
              </div>
              <code className="block text-xs text-muted-foreground">
                {color.class}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
