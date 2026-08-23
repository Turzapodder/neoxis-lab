import React from 'react';

interface StatItem {
  id: string;
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const StatsBar: React.FC = () => {
  const stats: StatItem[] = [
    {
      id: 'projects',
      value: '50+',
      label: 'Projects Completed',
      icon: (
        /* Starburst / 8-point star icon matching UI */
        <svg
          className="w-5 h-5 text-white/90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" />
        </svg>
      ),
    },
    {
      id: 'clients',
      value: '30+',
      label: 'Happy Clients',
      icon: (
        /* Two users / community icon */
        <svg
          className="w-5 h-5 text-white/90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'experience',
      value: '8+',
      label: 'Years Experience',
      icon: (
        /* Rocket launch icon */
        <svg
          className="w-5 h-5 text-white/90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
          <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
        </svg>
      ),
    },
    {
      id: 'countries',
      value: '15+',
      label: 'Countries Served',
      icon: (
        /* Globe icon */
        <svg
          className="w-5 h-5 text-white/90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full relative z-30 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 mt-6 lg:mt-8 pb-10">
      <div className="glass-panel rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 lg:px-10 lg:py-6 shadow-2xl transition-all duration-300 hover:border-white/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl transition-all duration-300 hover:bg-white/[0.03] group ${
                index !== 0 ? 'md:border-l md:border-white/10 md:pl-6 lg:pl-8' : ''
              }`}
            >
              {/* Icon Container */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 shadow-inner">
                {stat.icon}
              </div>

              {/* Stat Text */}
              <div className="flex flex-col">
                <span className="font-clash text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-white transition-colors leading-tight">
                  {stat.value}
                </span>
                <span className="font-neue text-xs sm:text-[13.5px] font-normal text-[#9E9E9E] group-hover:text-white/80 transition-colors whitespace-nowrap mt-0.5">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
