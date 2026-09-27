import React from 'react';
import { CLIENT_STATS } from '@/data/testimonials';
import type { ClientStat } from '@/types/content';

const StatCard: React.FC<{ stat: ClientStat }> = ({ stat }) => (
  <div data-reveal className="relative rounded-[24px] bg-white p-5 sm:p-6 min-h-[200px] sm:min-h-[220px] flex flex-col justify-between">
    <span className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-neutral-200" />
    <span className="text-sm font-medium">{stat.label}</span>
    <div className={`flex items-end gap-4 ${stat.avatars ? 'justify-between' : ''}`}>
      <span className="font-clash font-bold text-6xl sm:text-7xl leading-none tracking-tight">{stat.value}</span>
      {stat.avatars ? (
        <div className="flex -space-x-2 pb-1">
          {stat.avatars.map((src) => (
            <img key={src} src={src} alt="" className="w-7 h-7 rounded-full object-cover border-2 border-white" />
          ))}
        </div>
      ) : (
        <span className="text-[11px] leading-snug text-neutral-500 max-w-[130px] pb-1">{stat.caption}</span>
      )}
    </div>
  </div>
);

export const ClientStats: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
    {CLIENT_STATS.map((stat) => (
      <StatCard key={stat.id} stat={stat} />
    ))}
  </div>
);
