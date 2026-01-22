
import React from 'react';
import { IGFormatData, FBFormatData, LIFormatData, YTFormatData, HashtagData, Highlight, PostPerformance, DemographicData, CountryData } from './types';
import { appData } from './data';

export const COLORS = {
  brandPrimary: '#002B1B', // Deep Alveos Green
  brandSecondary: '#D1C9BC', // Muted Beige
  brandBackground: '#FAF7F2', // Light Cream
  instagram: '#E1306C',
  facebook: '#1877F2',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
  static: '#002B1B', 
  carousel: '#4A5D4E',
  reel: '#8E9A82',
  women: '#6D8A74',
  men: '#002B1B'
};

export const IG_METRICS: IGFormatData[] = appData.metrics.instagram as IGFormatData[];
export const FB_METRICS: FBFormatData[] = appData.metrics.facebook as FBFormatData[];
export const LI_METRICS: LIFormatData[] = appData.metrics.linkedin as LIFormatData[];
export const YT_METRICS: YTFormatData[] = appData.metrics.youtube as YTFormatData[];

export const HASHTAG_ER_METRICS: HashtagData[] = appData.hashtags.er_performance as HashtagData[];
export const HASHTAG_VOLUME_METRICS = appData.hashtags.volume_drivers;

export const TOP_POSTS_IG: PostPerformance[] = appData.posts.instagram.top as PostPerformance[];
export const BOTTOM_POSTS_IG: PostPerformance[] = appData.posts.instagram.bottom as PostPerformance[];

export const TOP_POSTS_LI: PostPerformance[] = appData.posts.linkedin.top as PostPerformance[];
export const BOTTOM_POSTS_LI: PostPerformance[] = appData.posts.linkedin.bottom as PostPerformance[];

// Fix: Conversion to 'unknown' first to resolve type overlap errors with YouTube data structures
export const TOP_POSTS_YT: PostPerformance[] = (appData.posts.youtube.top as unknown) as PostPerformance[];
// Fix: Conversion to 'unknown' first to resolve type overlap errors with YouTube data structures
export const BOTTOM_POSTS_YT: PostPerformance[] = (appData.posts.youtube.bottom as unknown) as PostPerformance[];

export const AUDIENCE_DEMOGRAPHICS: DemographicData[] = appData.audience.demographics as DemographicData[];
export const TOP_COUNTRIES: CountryData[] = appData.audience.countries as CountryData[];

export const OVERALL_TIMING_RANK = appData.timing.overall_rank;
export const PLATFORM_TIMING_HIGHS = appData.timing.platform_highs;

export const HIGHLIGHTS: Highlight[] = appData.highlights as Highlight[];

export const Icons = {
  AlveosLogo: (props: any) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="32" r="11" fill="currentColor"/>
      <circle cx="34" cy="58" r="11" fill="currentColor"/>
      <circle cx="66" cy="58" r="11" fill="currentColor"/>
      <circle cx="50" cy="48" r="11" fill="currentColor"/>
    </svg>
  ),
  AkoraLogo: (props: any) => (
    <svg viewBox="0 0 350 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="0" y="38" fill="currentColor" style={{ font: 'bold 36px Outfit, sans-serif', letterSpacing: '0.1em' }}>AKORA STUDIO.</text>
    </svg>
  ),
  Mail: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  Briefcase: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
  Instagram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  Facebook: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  LinkedIn: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  YouTube: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
    </svg>
  ),
  Grid: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  Woman: (props: any) => (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d="M50 20c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10zm18.3 33.7c-3.1-4.7-8.3-7.7-14.1-7.7h-8.4c-5.8 0-11 3-14.1 7.7L25 65h10v35h10V75h10v25h10V65h10l-6.7-11.3z" />
    </svg>
  ),
  Man: (props: any) => (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d="M50 20c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10zm25 25h-10v-5c0-5.5-4.5-10-10-10H45c-5.5 0-10 4.5-10 10v5h-10v35h15v25h20V75h15V45z" />
    </svg>
  ),
  WorldMap: (props: any) => (
    <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M120 120 Q180 80 280 100 T380 140 Q420 180 370 240 T240 280 Q140 240 120 120" fill="currentColor" opacity="0.1" />
      <path d="M230 300 Q260 330 250 380 T210 400 Q190 360 200 320 T230 300" fill="currentColor" opacity="0.1" />
      <path d="M420 100 Q520 60 620 80 T720 130 Q770 230 670 280 T520 260 Q420 230 420 100" fill="currentColor" opacity="0.1" />
      <path d="M470 230 Q520 260 500 330 T440 380 Q400 330 420 280 T470 230" fill="currentColor" opacity="0.1" />
      <path d="M660 300 Q710 310 730 360 T690 390 Q640 360 660 300" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  TrendingUp: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  )
};