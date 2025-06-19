import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Check, Loader2, Plus, Trash2, Settings, Star, Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = [
  { name: 'Primary', variant: 'primary' as const },
  { name: 'Secondary', variant: 'secondary' as const },
  { name: 'Outline', variant: 'outline' as const },
  { name: 'Ghost', variant: 'ghost' as const },
  { name: 'Link', variant: 'link' as const },
  { name: 'Terminal', variant: 'terminal' as const },
  { name: 'Accent', variant: 'accent' as const },
];

const buttonSizes = [
  { name: 'Small', size: 'sm' as const },
  { name: 'Default', size: 'default' as const },
  { name: 'Large', size: 'lg' as const },
  { name: 'Extra Large', size: 'xl' as const },
  { name: 'Icon', size: 'icon' as const },
];

export function ButtonsDemo() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Button Variants</h2>
        <div className="space-y-8">
          {buttonVariants.map(({ name, variant }) => (
            <div key={variant} className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">{name}</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant={variant}>{name}</Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
                <Button variant={variant}>
                  <Download className="mr-2 h-4 w-4" />
                  With Icon
                </Button>
                <Button variant={variant} size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant={variant} className="gap-2">
                  <span>Loading</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Button Sizes</h2>
        <div className="space-y-8">
          {buttonSizes.map(({ name, size }) => (
            <div key={size} className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">{name}</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size={size} variant="primary">
                  {size === 'icon' ? (
                    <Settings className="h-4 w-4" />
                  ) : (
                    'Button'
                  )}
                </Button>
                <Button size={size} variant="outline">
                  {size === 'icon' ? (
                    <Plus className="h-4 w-4" />
                  ) : (
                    'Outline'
                  )}
                </Button>
                <Button size={size} variant="ghost">
                  {size === 'icon' ? (
                    <Trash2 className="h-4 w-4" />
                  ) : (
                    'Ghost'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Button States</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Default',
              buttons: [
                <Button key="default">Default</Button>,
                <Button key="default-disabled" disabled>
                  Disabled
                </Button>,
              ],
            },
            {
              name: 'Loading',
              buttons: [
                <Button key="loading" className="gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading</span>
                </Button>,
                <Button key="loading-icon" size="icon" disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>,
              ],
            },
            {
              name: 'With Icons',
              buttons: [
                <Button key="icon-left" variant="outline">
                  <Star className="mr-2 h-4 w-4" />
                  Favorite
                </Button>,
                <Button key="icon-right" variant="outline">
                  Share
                  <Share2 className="ml-2 h-4 w-4" />
                </Button>,
              ],
            },
            {
              name: 'Icon Buttons',
              buttons: [
                <Button key="icon" variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>,
                <Button key="icon-outline" variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>,
              ],
            },
            {
              name: 'Full Width',
              buttons: [
                <Button key="full-width" className="w-full">
                  Full Width Button
                </Button>,
              ],
            },
            {
              name: 'Rounded',
              buttons: [
                <Button key="rounded" variant="outline" className="rounded-full">
                  Rounded
                </Button>,
                <Button key="rounded-icon" size="icon" className="rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>,
              ],
            },
          ].map((group, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                {group.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                {group.buttons}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Button Groups</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Horizontal Group
            </h3>
            <div className="flex">
              <Button variant="outline" className="rounded-r-none">
                Left
              </Button>
              <Button
                variant="outline"
                className="rounded-none border-l-0 border-r-0"
              >
                Middle
              </Button>
              <Button variant="outline" className="rounded-l-none">
                Right
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Vertical Group
            </h3>
            <div className="inline-flex flex-col">
              <Button variant="outline" className="rounded-b-none">
                Top
              </Button>
              <Button
                variant="outline"
                className="rounded-none border-t-0 border-b-0"
              >
                Middle
              </Button>
              <Button variant="outline" className="rounded-t-none">
                Bottom
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
