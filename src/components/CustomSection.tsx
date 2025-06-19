"use client";

import { ReactNode } from "react";
import { Section, SectionContent, type SectionProps as BaseSectionProps } from "@/components/ui/section";
import { GradientText } from "@/components/gradient-text";

interface CustomSectionProps extends Omit<BaseSectionProps, 'title'> {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClass?: string;
  titleClass?: string;
  showDivider?: boolean;
  noPadding?: boolean;
}

export const CustomSection = ({
  id,
  title = "", // Default empty string to satisfy Section's required title prop
  subtitle,
  children,
  className = "",
  containerClass = "",
  titleClass = "",
  showDivider = false,
  noPadding = false,
  ...props
}: CustomSectionProps) => (
  <Section 
    id={id}
    title={title}
    subtitle={subtitle}
    className={`${!noPadding ? 'py-20' : ''} scroll-mt-20 relative ${className}`} 
    showDivider={showDivider}
    {...props}
  >
    <SectionContent className={containerClass}>
      {children}
    </SectionContent>
  </Section>
);
