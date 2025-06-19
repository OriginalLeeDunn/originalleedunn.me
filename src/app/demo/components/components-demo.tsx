import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Check, X, AlertCircle, Info, Loader2, Plus, Bell, Search, Moon, Sun, Settings, User, LogOut } from 'lucide-react';

export function ComponentsDemo() {
  const [progress, setProgress] = useState(33);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option-one');
  const [tabsValue, setTabsValue] = useState('account');
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Form Elements</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
              <p className="text-sm text-muted-foreground">We&apos;ll never share your email.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us a little bit about yourself" className="min-h-[100px]" />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" checked={switchChecked} onCheckedChange={setSwitchChecked} />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>

            <div className="space-y-2">
              <Label>Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="comments" />
                  <Label htmlFor="comments">Comments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" defaultChecked />
                  <Label htmlFor="marketing">Marketing emails</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="push" disabled />
                  <Label htmlFor="push" className="text-muted-foreground">Push notifications</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Radio Group</Label>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Option Two</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-three" disabled />
                  <Label htmlFor="option-three" className="text-muted-foreground">Option Three (disabled)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Slider</Label>
              <div className="space-y-4">
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Current value: {sliderValue}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Progress</Label>
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    Decrease
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    Increase
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Tabs</h2>
        <Tabs value={tabsValue} onValueChange={setTabsValue} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@originalleedunn" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input id="display-name" defaultValue="Lee Dunn" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                    <span>Email Notifications</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Receive emails about your account activities.
                    </span>
                  </Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                    <span>Push Notifications</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Receive push notifications on your device.
                    </span>
                  </Label>
                  <Switch id="push-notifications" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="billing" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>
                  Manage your subscription and payment methods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You&apos;re currently on the <strong>Pro</strong> plan.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Subscription
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Cards</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>Simple card with title and description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is a basic card with some content inside.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Continue</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle>With Badge</CardTitle>
              <CardDescription>Card with a badge in the header</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Members</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="text-sm font-medium">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-sm font-medium">Create New Project</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get started by creating a new project
              </p>
              <Button className="mt-4">Create Project</Button>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Badges</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0">Gradient</Badge>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Loading States</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button disabled={isLoading} onClick={simulateLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Click to Load'
            )}
          </Button>

          <Button variant="outline" size="icon" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>

          <div className="relative">
            <Button variant="outline" className="relative overflow-hidden">
              <span className={cn('transition-opacity', isLoading && 'opacity-0')}>
                Button with Loading
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing RefreshCw icon component
const RefreshCw = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);
