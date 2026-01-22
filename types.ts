import React from 'react';

export enum Platform {
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  LINKEDIN = 'LinkedIn',
  YOUTUBE = 'YouTube'
}

export interface MetricSummary {
  label: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
}

export interface IGFormatData {
  format: string;
  posts: number;
  totalReach: number;
  avgReach: number;
  avgER: number;
  avgSaveRate: number;
  avgShareRate: number;
  totalFollows: number;
  color: string;
}

export interface FBFormatData {
  format: string;
  posts: number;
  totalReach: number;
  avgReach: number;
  avgER: number;
  avgClickRate: number;
  avgWatchPercent?: number;
  color: string;
}

export interface LIFormatData {
  format: string;
  posts: number;
  impressions: number;
  clicks: number;
  ctr: number;
  er: number;
  avgViews?: number;
  color: string;
}

export interface YTFormatData {
  format: string;
  videos: number;
  views: number;
  watchTime: number;
  avgDuration: string;
  retention: number;
  impressions: number;
  ctr: number;
  engagementRate: number;
  color: string;
}

export interface HashtagData {
  tag: string;
  count: number;
  avgER: number;
  type: 'top' | 'baseline';
}

export interface PostPerformance {
  date: string;
  format: string;
  // Fix: Make reach optional as some platforms (like YouTube) provide views/impressions instead
  reach?: number;
  er: number;
  saves?: number;
  comments?: number;
  follows?: number;
  shares?: number;
  learning?: string;
  imageUrl?: string;
  clicks?: number;
  ctr?: number;
  views?: number;
  watchTime?: string;
  // Fix: Add missing fields used by individual platform data (e.g., YouTube) and rendered in App.tsx
  title?: string;
  impressions?: number;
}

export interface Highlight {
  title: string;
  content: string;
  type: 'positive' | 'neutral' | 'info';
  value?: string;
  icon?: string;
}

export interface DemographicData {
  segment: string;
  percentage: number;
  gender: 'Women' | 'Men';
}

export interface CountryData {
  country: string;
  percentage: number;
}