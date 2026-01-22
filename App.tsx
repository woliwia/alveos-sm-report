import React, { useState, useMemo } from 'react';
import { Platform } from './types';
import { Icons, HIGHLIGHTS, COLORS, IG_METRICS, FB_METRICS, LI_METRICS, YT_METRICS, TOP_POSTS_IG, BOTTOM_POSTS_IG, TOP_POSTS_LI, BOTTOM_POSTS_LI, TOP_POSTS_YT, BOTTOM_POSTS_YT, AUDIENCE_DEMOGRAPHICS, TOP_COUNTRIES, OVERALL_TIMING_RANK, PLATFORM_TIMING_HIGHS } from './constants';
import { appData } from './data';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  Legend,
  LabelList
} from 'recharts';

// --- Improved Chart Components ---

const GeographicBarChart: React.FC = () => {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={TOP_COUNTRIES}
          layout="vertical"
          margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="country" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: COLORS.brandPrimary, fontSize: 11, fontWeight: 600 }}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: '#FAF7F2' }}
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
          />
          <Bar dataKey="percentage" fill={COLORS.brandPrimary} radius={[0, 10, 10, 0]} barSize={24}>
            <LabelList dataKey="percentage" position="right" formatter={(v: number) => `${v}%`} style={{ fill: COLORS.brandPrimary, fontWeight: 700, fontSize: 11 }} offset={10} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ResonanceBarChart: React.FC = () => {
  const data = AUDIENCE_DEMOGRAPHICS.map(d => ({
    name: `${d.gender} ${d.segment}`,
    percentage: d.percentage,
    fill: d.gender === 'Women' ? COLORS.women : COLORS.men
  }));

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis hide />
          <Tooltip 
            cursor={{ fill: '#FAF7F2' }}
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
          />
          <Bar dataKey="percentage" radius={[8, 8, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList dataKey="percentage" position="top" formatter={(v: number) => `${v}%`} style={{ fill: COLORS.brandPrimary, fontWeight: 700, fontSize: 11 }} offset={10} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Summary Components ---

const DetailedInsight: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="py-6 border-b border-slate-50 last:border-0 group">
    <h5 className="text-[10px] font-bold text-[#002B1B] uppercase tracking-[0.25em] mb-3 opacity-60 group-hover:opacity-100 transition-opacity">{title}</h5>
    <div className="text-sm text-slate-600 leading-relaxed font-medium">
      {children}
    </div>
  </div>
);

const MetricCard: React.FC<{ label: string; value: string | number; subtitle?: string; color: string }> = ({ label, value, subtitle, color }) => (
  <div className="brand-card p-8 flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300 border border-slate-50">
    <div>
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">{label}</p>
      <h3 className="text-4xl font-bold heading-font" style={{ color: COLORS.brandPrimary }}>{value}</h3>
    </div>
    {subtitle && <p className="text-slate-400 text-[10px] mt-6 font-medium uppercase tracking-[0.1em]">{subtitle}</p>}
  </div>
);

const PlatformTab: React.FC<{ platform: Platform; active: boolean; onClick: () => void; disabled?: boolean }> = ({ platform, active, onClick, disabled }) => {
  const Icon = Icons[platform as keyof typeof Icons] || Icons.Grid;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2.5 px-6 py-3 brand-pill transition-all duration-300 ${
        disabled ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer'
      } ${
        active 
          ? 'bg-[#002B1B] text-white shadow-xl shadow-green-900/10 scale-105' 
          : 'bg-white text-[#002B1B] hover:bg-[#EFEBE5] border border-slate-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{platform}</span>
    </button>
  );
};

const HighlightBox: React.FC<{ item: any }> = ({ item }) => {
  const Icon = Icons[item.icon as keyof typeof Icons] || Icons.TrendingUp;
  return (
    <div className="bg-white border border-slate-100 p-10 rounded-[40px] flex flex-col items-center text-center gap-6 shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="p-4 bg-[#FAF7F2] rounded-3xl text-[#002B1B]">
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h4 className="font-bold text-[#002B1B] uppercase text-[10px] tracking-[0.3em] mb-3">{item.title}</h4>
        <div className="text-4xl font-black heading-font text-[#002B1B] mb-4">{item.value}</div>
        <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.content}</p>
      </div>
    </div>
  );
};

const Glossary: React.FC = () => (
  <div className="bg-[#FAF7F2] rounded-[32px] p-8 mt-12 border border-slate-100">
    <h4 className="font-bold text-[#002B1B] uppercase text-[10px] tracking-[0.3em] mb-6">Glossary / Legend</h4>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {[
        { term: 'ER', desc: 'Engagement Rate: Total interactions divided by reach.' },
        { term: 'CTR', desc: 'Click-Through Rate: Unique clicks divided by impressions.' },
        { term: 'Reach', desc: 'Total unique individuals who viewed content.' },
        { term: 'Views', desc: 'Total volume of times content was consumed.' },
        { term: 'Saves', desc: 'Educational value & high intent signal from users.' },
      ].map((item, i) => (
        <div key={i}>
          <p className="font-bold text-[#002B1B] text-xs uppercase tracking-widest mb-1">{item.term}</p>
          <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const PerformanceCard: React.FC<{ post: any; type: 'top' | 'bottom' }> = ({ post, type }) => (
  <div className={`brand-card overflow-hidden flex flex-col h-full border ${type === 'top' ? 'border-emerald-50' : 'border-slate-50'}`}>
    <div className="p-8 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em] block mb-2">{post.date} — {post.format}</span>
          <h5 className="font-bold text-[#002B1B] text-lg heading-font leading-tight mb-2">
            {post.title || (post.ctr !== undefined ? `CTR: ${post.ctr}%` : post.views !== undefined ? `Views: ${post.views.toLocaleString()}` : `Reach: ${post.reach?.toLocaleString()}`)}
          </h5>
        </div>
        {type === 'top' && post.er !== undefined && (
          <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {post.er}% ER
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-slate-50 rounded-2xl">
          <span className="block text-[8px] text-slate-400 font-bold uppercase mb-1 tracking-widest">
            {post.watchTime !== undefined ? 'Watch' : post.clicks !== undefined ? 'Clicks' : 'Saves'}
          </span>
          <span className="font-bold text-[#002B1B] text-sm">
            {post.watchTime !== undefined ? post.watchTime : post.clicks !== undefined ? post.clicks : (post.saves || 0)}
          </span>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-2xl">
          <span className="block text-[8px] text-slate-400 font-bold uppercase mb-1 tracking-widest">
            {post.avgViewDuration !== undefined ? 'Avg Dur.' : (post.impressions !== undefined ? 'Impress.' : 'Likes')}
          </span>
          <span className="font-bold text-[#002B1B] text-sm">
            {post.avgViewDuration !== undefined ? post.avgViewDuration : (post.impressions !== undefined ? post.impressions : (post.likes || 0))}
          </span>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-2xl">
          <span className="block text-[8px] text-slate-400 font-bold uppercase mb-1 tracking-widest">
             {post.follows !== undefined ? 'Subs' : (post.views !== undefined ? 'Views' : 'Reach')}
          </span>
          <span className="font-bold text-[#002B1B] text-sm">
            {post.follows !== undefined ? `+${post.follows}` : (post.views !== undefined ? post.views.toLocaleString() : (post.reach ? (post.reach > 1000 ? (post.reach / 1000).toFixed(1) + 'k' : post.reach) : '—'))}
          </span>
        </div>
      </div>
      {post.shares !== undefined && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Shares</span>
          <span className="text-sm font-bold text-[#002B1B]">{post.shares}</span>
        </div>
      )}
    </div>
  </div>
);

const EfficiencyTable: React.FC<{ platform: string }> = ({ platform }) => {
  const data = (appData as any).efficiency_groups?.[platform.toLowerCase()];
  if (!data) return null;

  return (
    <div className="mt-12 overflow-hidden border border-slate-100 rounded-[32px] bg-white">
      <table className="w-full text-left text-xs">
        <thead className="bg-[#FAF7F2] text-[#002B1B] font-bold uppercase tracking-widest border-b border-slate-100">
          <tr>
            <th className="px-6 py-5">Format Group</th>
            <th className="px-4 py-5 text-center">Posts</th>
            <th className="px-4 py-5 text-right">Reach/Imp.</th>
            <th className="px-4 py-5 text-center">Eng.</th>
            <th className="px-4 py-5 text-center">ER%</th>
            <th className="px-4 py-5 text-center">{platform === 'Instagram' ? 'Saves' : 'Clicks'}</th>
            <th className="px-4 py-5 text-center">{platform === 'Instagram' ? 'Save%' : 'CTR%'}</th>
            <th className="px-4 py-5 text-center">Shares</th>
            <th className="px-4 py-5 text-center">Share%</th>
            {platform === 'Facebook' && <th className="px-4 py-5 text-center">Watch%</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((row: any, i: number) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-[#002B1B]">{row.group}</td>
              <td className="px-4 py-4 text-center font-medium text-slate-500">{row.posts}</td>
              <td className="px-4 py-4 text-right font-bold text-[#002B1B]">{row.reach.toLocaleString()}</td>
              <td className="px-4 py-4 text-center font-medium text-slate-500">{row.engagements}</td>
              <td className="px-4 py-4 text-center font-bold text-emerald-600">{row.er.toFixed(2)}%</td>
              <td className="px-4 py-4 text-center font-medium text-slate-500">
                {platform === 'Instagram' ? (row.saves ?? '—') : (row.clicks ?? '—')}
              </td>
              <td className="px-4 py-4 text-center font-bold text-[#002B1B]">
                {platform === 'Instagram' ? (row.saveRate ? `${row.saveRate.toFixed(2)}%` : '—') : (row.clickRate ? `${row.clickRate.toFixed(2)}%` : '—')}
              </td>
              <td className="px-4 py-4 text-center font-medium text-slate-500">{row.shares ?? 0}</td>
              <td className="px-4 py-4 text-center font-medium text-slate-400">{row.shareRate.toFixed(2)}%</td>
              {platform === 'Facebook' && <td className="px-4 py-4 text-center font-bold text-[#002B1B]">{row.watchRate ? `${row.watchRate}%` : '—'}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<Platform>(Platform.INSTAGRAM);

  const activeMetrics = useMemo(() => {
    if (activePlatform === Platform.INSTAGRAM) return IG_METRICS;
    if (activePlatform === Platform.FACEBOOK) return FB_METRICS;
    if (activePlatform === Platform.LINKEDIN) return LI_METRICS;
    if (activePlatform === Platform.YOUTUBE) return YT_METRICS;
    return [];
  }, [activePlatform]);

  const postMixData = useMemo(() => {
    const source = activeMetrics;
    if (!source || source.length === 0) return [];
    
    return source.map(m => ({
      name: m.format,
      value: (m as any).posts || (m as any).videos || 0,
      fill: m.color
    }));
  }, [activeMetrics]);

  const efficiencyData = useMemo(() => {
    return activeMetrics.map((m: any) => {
      const volume = m.totalReach || m.impressions || m.views || 0;
      const count = m.posts || m.videos || 0;
      return {
        name: m.format,
        value: Math.round(count > 0 ? volume / count : 0),
        fill: m.color
      };
    });
  }, [activeMetrics]);

  const currentPosts = useMemo(() => {
    if (activePlatform === Platform.LINKEDIN) {
      return { top: TOP_POSTS_LI, bottom: BOTTOM_POSTS_LI };
    }
    if (activePlatform === Platform.YOUTUBE) {
      return { top: TOP_POSTS_YT, bottom: BOTTOM_POSTS_YT };
    }
    return { top: TOP_POSTS_IG, bottom: BOTTOM_POSTS_IG };
  }, [activePlatform]);

  const hasAudienceData = activePlatform !== Platform.LINKEDIN && activePlatform !== Platform.YOUTUBE;
  const hasContentDetail = true; 
  
  const platformTimingHighs = useMemo(() => {
    const platformKey = activePlatform.toLowerCase() as keyof typeof PLATFORM_TIMING_HIGHS;
    return PLATFORM_TIMING_HIGHS[platformKey] || [];
  }, [activePlatform]);

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-[#FAF7F2] pt-20 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-10 flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 mb-8">
          </div>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold heading-font text-[#002B1B] uppercase tracking-[0.1em] leading-tight">
              alveos - Social Media Performance Report
            </h2>
            <p className="text-slate-400 mt-4 font-bold uppercase text-[11px] tracking-[0.4em]">
              Period: 10 Dec 2025 — 10 Jan 2026
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-10 mt-12">
        {/* Permanent Summary & Key Findings Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 flex flex-col gap-10">
              <div className="mb-4">
                <h3 className="text-[12px] font-bold text-[#002B1B] uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                  <span className="w-12 h-[1.5px] bg-[#002B1B]"></span>
                  Overview
                </h3>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                  Consolidated performance metrics across all active social surfaces.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {HIGHLIGHTS.map((item, idx) => (
                  <HighlightBox key={idx} item={item} />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-sm h-full flex flex-col">
                <h4 className="font-bold text-[#002B1B] uppercase text-[11px] tracking-[0.3em] mb-8 pb-4 border-b border-slate-50">Key Findings (Period Specific)</h4>
                
                <div className="flex-1 space-y-2">
                  <DetailedInsight title="Growth Strategy">
                    Instagram is your main growth engine right now. It delivered the highest meaningful outcomes in this period: strong reach, solid engagement efficiency, and consistent follower growth signals.
                  </DetailedInsight>

                  <DetailedInsight title="Content Resonance">
                    <ul className="list-disc pl-4 space-y-2">
                      <li><strong>IG Reels:</strong> Dominates distribution and new follower acquisition.</li>
                      <li><strong>IG Carousels:</strong> Best for high-intent saves and technical education.</li>
                      <li><strong>LinkedIn:</strong> Text-heavy/image posts outperform video significantly for CTR.</li>
                    </ul>
                  </DetailedInsight>

                  <DetailedInsight title="Platform Health">
                    YouTube performance is concentrated but growing; Short-form content has found an algorithmic hook. Facebook remains a supporting distribution channel with low active interaction.
                  </DetailedInsight>

                  <DetailedInsight title="Messaging Wins">
                    Outcome-driven, "slightly contrarian" claims perform best (e.g., direct data payoff). Abstract or reflective storytelling underperformed.
                  </DetailedInsight>
                </div>
              </div>
            </div>
          </div>

          <Glossary />

          <div className="mt-16">
             <h4 className="font-bold text-[#002B1B] uppercase text-[11px] tracking-[0.3em] mb-8">Best Days Across All Platforms (Overall Score)</h4>
             <div className="brand-card overflow-hidden border border-slate-50">
               <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-slate-100">
                  {OVERALL_TIMING_RANK.map((r, i) => (
                    <div key={i} className="p-8 flex flex-col items-center gap-4 hover:bg-slate-50 transition-colors text-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rank {r.rank}</span>
                      <h5 className="text-xl font-bold heading-font text-[#002B1B]">{r.day}</h5>
                      <div className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase">
                        Score: {r.score.toFixed(3)}
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        </section>

        {/* Platform Switcher & Detailed Data Section */}
        <section className="mb-16 border-t border-slate-100 pt-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-16">
            <h3 className="text-2xl font-bold heading-font text-[#002B1B]">{activePlatform} Performance Detail</h3>
            <div className="flex flex-wrap gap-4">
              {[Platform.INSTAGRAM, Platform.FACEBOOK, Platform.LINKEDIN, Platform.YOUTUBE].map(p => (
                <PlatformTab key={p} platform={p} active={activePlatform === p} onClick={() => setActivePlatform(p)} />
              ))}
            </div>
          </div>

          <div className="space-y-24">
            {/* Metric Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {activePlatform === Platform.YOUTUBE ? (
                <>
                  <MetricCard label="Total Views" value="2,280" subtitle="Total Consumption" color={COLORS.brandPrimary} />
                  <MetricCard label="Watch Time" value="5.45 hrs" subtitle="Avg Duration: 8.6s" color={COLORS.brandPrimary} />
                  <MetricCard label="Weighted Retention" value="9.2%" subtitle="Avg Retention" color={COLORS.brandPrimary} />
                  <MetricCard label="Engagement Rate" value="0.97%" subtitle="Interaction efficiency" color={COLORS.brandPrimary} />
                  <MetricCard label="Total Impressions" value="1,731" subtitle="Algorithmic Push" color={COLORS.brandPrimary} />
                  <MetricCard label="Subscriber Net" value="+4" subtitle="Channel Growth" color={COLORS.brandPrimary} />
                </>
              ) : activePlatform === Platform.LINKEDIN ? (
                <>
                  <MetricCard label="Impressions" value="3,292" subtitle="Total Visibility" color={COLORS.brandPrimary} />
                  <MetricCard label="Total Views" value="4,118" subtitle="Est. Consumption Volume" color={COLORS.brandPrimary} />
                  <MetricCard label="Direct Clicks" value="373" subtitle="Total Traffic Intent" color={COLORS.brandPrimary} />
                  <MetricCard label="Weighted CTR" value="11.4%" subtitle="Click efficiency" color={COLORS.brandPrimary} />
                  <MetricCard label="Weighted ER" value="13.3%" subtitle="Reaction + Intent" color={COLORS.brandPrimary} />
                  <MetricCard label="Interactions" value="437" subtitle="Combined Engagements" color={COLORS.brandPrimary} />
                </>
              ) : activePlatform === Platform.INSTAGRAM ? (
                <>
                  <MetricCard label="Total Reach" value="14,112" subtitle="Unique Audience" color={COLORS.brandPrimary} />
                  <MetricCard label="Total Views" value="90,998" subtitle="Consumption Volume" color={COLORS.brandPrimary} />
                  <MetricCard label="Engagements" value="380" subtitle="Interactions (All)" color={COLORS.brandPrimary} />
                  <MetricCard label="Total Saves" value="137" subtitle="Educational high-intent" color={COLORS.brandPrimary} />
                  <MetricCard label="Total Likes" value="212" subtitle="Active Approval" color={COLORS.brandPrimary} />
                  <MetricCard label="Comments" value="31" subtitle="Community Feedback" color={COLORS.brandPrimary} />
                </>
              ) : (
                <>
                  <MetricCard label="Total Reach" value="1,576" subtitle="Unique Distribution" color={COLORS.brandPrimary} />
                  <MetricCard label="Total Views" value="2,411" subtitle="Total Consumption" color={COLORS.brandPrimary} />
                  <MetricCard label="Link Clicks" value="6" subtitle="Targeted Intent" color={COLORS.brandPrimary} />
                  <MetricCard label="Total Likes" value="3" subtitle="Direct approval" color={COLORS.brandPrimary} />
                  <MetricCard label="Total Comments" value="1" subtitle="Feedback" color={COLORS.brandPrimary} />
                  <MetricCard label="Engagements" value="4" subtitle="Interactions" color={COLORS.brandPrimary} />
                </>
              )}
            </div>

            {/* Timing Intelligence */}
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                 <h3 className="text-[12px] font-bold text-[#002B1B] uppercase tracking-[0.4em] whitespace-nowrap">Timing Intelligence</h3>
                 <div className="h-[1.5px] flex-1 bg-slate-100"></div>
              </div>
              <div className="brand-card p-12 border border-slate-50">
                <h4 className="font-bold text-[#002B1B] uppercase text-[11px] tracking-[0.3em] mb-12">Best Days to Publish on {activePlatform}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {platformTimingHighs.map((d: any, i: number) => (
                    <div key={i} className="flex flex-col p-8 bg-[#FAF7F2] rounded-3xl border border-slate-50 hover:translate-y-[-4px] transition-transform duration-300">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xl font-bold heading-font text-[#002B1B]">{d.day}</span>
                        <div className="p-2 bg-emerald-500 rounded-full text-white">
                          <Icons.TrendingUp className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="mt-auto">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{activePlatform === Platform.YOUTUBE ? 'Views Strategy' : 'Engagement Peak'}</p>
                        <p className="text-2xl font-bold text-[#002B1B]">{d.metric}</p>
                        <p className="text-[10px] text-slate-500 mt-2 font-medium">Based on {activePlatform === Platform.YOUTUBE ? d.videos : d.posts} units</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audience Intelligence */}
            {hasAudienceData && (
              <div className="space-y-12">
                <div className="flex items-center gap-6">
                   <h3 className="text-[12px] font-bold text-[#002B1B] uppercase tracking-[0.4em] whitespace-nowrap">Audience Intelligence</h3>
                   <div className="h-[1.5px] flex-1 bg-slate-100"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-7 brand-card p-12 border border-slate-50 flex flex-col">
                    <h4 className="font-bold text-[#002B1B] uppercase text-[11px] tracking-[0.3em] mb-16">Resonance Profile</h4>
                    <ResonanceBarChart />
                  </div>
                  <div className="lg:col-span-5 brand-card p-12 border border-slate-50 flex flex-col overflow-hidden">
                    <h4 className="font-bold text-[#002B1B] uppercase text-[11px] tracking-[0.3em] mb-16">Geographic Density</h4>
                    <GeographicBarChart />
                  </div>
                </div>
              </div>
            )}

            {/* Distribution & Efficiency */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4 brand-card p-12 flex flex-col items-center border border-slate-50">
                  <h4 className="font-bold text-[#002B1B] uppercase text-[11px] tracking-[0.3em] mb-12 w-full text-left">Portfolio Distribution</h4>
                  <div className="h-[340px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 40 }}>
                        <Pie data={postMixData} cx="50%" cy="45%" innerRadius={70} outerRadius={100} paddingAngle={6} dataKey="value" stroke="none">
                          {postMixData.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                        <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="lg:col-span-8 brand-card p-12 border border-slate-50">
                  <h4 className="font-bold text-[#002B1B] uppercase text-[11px] tracking-[0.3em] mb-8">Format Efficiency</h4>
                  <p className="text-slate-400 text-[9px] uppercase tracking-widest font-bold mb-12">Average distribution volume per content unit</p>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={efficiencyData} margin={{ top: 30, right: 30, left: 20, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: COLORS.brandPrimary, fontSize: 11, fontWeight: 700 }} 
                          dy={16} 
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                        <Tooltip cursor={{ fill: '#FAF7F2', radius: 10 }} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                        <Bar dataKey="value" name="Avg. Volume" radius={[10, 10, 0, 0]} barSize={80}>
                          {efficiencyData.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                          <LabelList dataKey="value" position="top" style={{ fill: COLORS.brandPrimary, fontWeight: 700, fontSize: 11 }} offset={10} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {activePlatform !== Platform.YOUTUBE && <EfficiencyTable platform={activePlatform} />}
            </div>

            {/* Post Intelligence */}
            {hasContentDetail && (
              <div className="space-y-12">
                <div className="flex items-center gap-6">
                   <h3 className="text-[12px] font-bold text-[#002B1B] uppercase tracking-[0.4em] whitespace-nowrap">Post Intelligence</h3>
                   <div className="h-[1.5px] flex-1 bg-slate-100"></div>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <h4 className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      Peak Performance Content {activePlatform === Platform.YOUTUBE ? '(by Views)' : ''}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {currentPosts.top.map((post: any, idx: number) => <PerformanceCard key={idx} post={post} type="top" />)}
                    </div>
                  </div>

                  {currentPosts.bottom.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                        Improvement Opportunities {activePlatform === Platform.YOUTUBE ? '(by Views)' : ''}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {currentPosts.bottom.map((post: any, idx: number) => <PerformanceCard key={idx} post={post} type="bottom" />)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-10 mt-24 border-t border-slate-100 pt-20 pb-20">
        <div className="flex flex-col items-center gap-10">
          <Icons.AkoraLogo className="h-10 text-black max-w-full opacity-80" />
          <div className="text-center space-y-6">
            <h5 className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500">Prepared by Akora Studio.</h5>
            <div className="flex justify-center gap-6">
              <a href="mailto:akomaagency@gmail.com" className="px-8 py-3 bg-white border border-slate-200 brand-pill text-slate-600 hover:text-black transition-all flex items-center gap-3">
                <Icons.Mail className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-widest">Contact</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;