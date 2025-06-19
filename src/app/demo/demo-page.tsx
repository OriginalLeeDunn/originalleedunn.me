'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin, Mail, Code, Palette, Type, Zap, Layout, Component, Grid, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Import demo sections
import { ColorsDemo } from './components/colors-demo';
import { TypographyDemo } from './components/typography-demo';
import { ButtonsDemo } from './components/buttons-demo';
import { ComponentsDemo } from './components/components-demo';

type Section = 'colors' | 'typography' | 'buttons' | 'components';

export function DemoPage() {
  const [activeSection, setActiveSection] = useState<Section>('colors');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { id: 'colors', icon: <Palette className="w-5 h-5" />, label: 'Colors' },
    { id: 'typography', icon: <Type className="w-5 h-5" />, label: 'Typography' },
    { id: 'buttons', icon: <Zap className="w-5 h-5" />, label: 'Buttons' },
    { id: 'components', icon: <Component className="w-5 h-5" />, label: 'Components' },
  ] as const;

  const renderSection = () => {
    switch (activeSection) {
      case 'colors':
        return <ColorsDemo />;
      case 'typography':
        return <TypographyDemo />;
      case 'buttons':
        return <ButtonsDemo />;
      case 'components':
        return <ComponentsDemo />;
      default:
        return <ColorsDemo />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              OLD
            </span>
            <span className="hidden sm:inline text-foreground">Design System</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/OriginalLeeDunn/originalleedunn.me" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button size="sm" className="hidden md:flex">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Layout className="w-5 h-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-30 w-64 border-r bg-background/95 p-4 transition-transform duration-300 ease-in-out md:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto',
          )}
        >
          <nav className="space-y-1">
            <h3 className="mb-4 px-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Foundation
            </h3>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id as Section);
                  setSidebarOpen(false);
                }}
                className={cn(
                  'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  activeSection === section.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground/70 hover:bg-accent/50 hover:text-accent-foreground',
                )}
              >
                <span className="mr-3">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 border-t pt-6">
            <h3 className="mb-4 px-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Resources
            </h3>
            <a
              href="https://github.com/OriginalLeeDunn/originalleedunn.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent/50 hover:text-accent-foreground"
            >
              <Code className="mr-3 h-5 w-5" />
              Source Code
            </a>
            <a
              href="https://www.figma.com/community/file/12345/design-system"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent/50 hover:text-accent-foreground"
            >
              <Grid className="mr-3 h-5 w-5" />
              Figma Design
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 lg:p-12">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {sections.find((s) => s.id === activeSection)?.label}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {activeSection === 'colors' && 'Color palette and theming system'}
                {activeSection === 'typography' && 'Type scale, fonts, and text styles'}
                {activeSection === 'buttons' && 'Button variations and states'}
                {activeSection === 'components' && 'Reusable UI components'}
              </p>
            </div>

            {renderSection()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
