import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, MoreVertical, Plus } from 'lucide-react';

import kateImg from '../assets/images/team/kate.jpg';
import leoImg from '../assets/images/team/leo.jpg';
import siennaImg from '../assets/images/team/sienna.jpg';
import tobiasImg from '../assets/images/team/tobias.jpg';
import randalImg from '../assets/images/team/randal.jpg';
import elenaImg from '../assets/images/team/elena.jpg';
import marcusImg from '../assets/images/team/marcus.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  image: string;
  rating: number;
  quote: string;
  bio: string;
  accentColor?: string;
  socials: {
    x?: string;
    linkedin?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'kate-lee-cobe',
    name: 'Kate Lee Cobe',
    role: 'Founder Kudos',
    category: 'Leadership',
    image: kateImg,
    rating: 5,
    quote:
      'Design is not just what it looks like, it is how every interaction resonates with purpose, craft, and human connection.',
    bio: 'Pioneering holistic creative strategy and digital craft for visionary ventures.',
    accentColor: '#F59E0B',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'leo-martin',
    name: 'Leo Martin',
    role: 'Head of Design',
    category: 'Design',
    image: leoImg,
    rating: 5,
    quote:
      'Pushing boundaries between brutalist precision and kinetic fluidity to create memorable digital identities that stand the test of time.',
    bio: 'Art director focusing on typography systems and interactive motion design.',
    accentColor: '#EC4899',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'sienna-cruz',
    name: 'Sienna Cruz',
    role: 'Brand Designer',
    category: 'Branding',
    image: siennaImg,
    rating: 5,
    quote:
      'Transforming abstract visions into cohesive, timeless design languages that stand out in crowded markets.',
    bio: 'Specialist in high-impact brand identities, packaging, and editorial guidelines.',
    accentColor: '#8B5CF6',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'tobias-nguyen',
    name: 'Tobias Nguyen',
    role: 'Lead Developer',
    category: 'Engineering',
    image: tobiasImg,
    rating: 5,
    quote:
      'Bridging the gap between ambitious visual design and silky 60fps web performance across all platforms.',
    bio: 'Creative technologist with deep expertise in WebGL, GSAP, and reactive systems.',
    accentColor: '#3B82F6',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'randal-boucher',
    name: 'Randal Boucher',
    role: 'UI Designer',
    category: 'Product Design',
    image: randalImg,
    rating: 5,
    quote:
      'This course helped me understand design from a real industry perspective. The projects improved my portfolio significantly.',
    bio: 'Senior UI/UX specialist focused on tactile micro-interactions and design systems.',
    accentColor: '#EA580C',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Motion Director',
    category: 'Motion & 3D',
    image: elenaImg,
    rating: 5,
    quote:
      'Adding soul and momentum to modern interfaces through calculated micro-physics and kinetic storytelling.',
    bio: '3D and motion artist crafting cinematic interactions and generative visuals.',
    accentColor: '#10B981',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Design Technologist',
    category: 'Systems',
    image: marcusImg,
    rating: 5,
    quote:
      'Crafting scalable architecture and modular design systems that empower high-growth engineering teams.',
    bio: 'Specializing in design tokens, component scalability, and frontend efficiency.',
    accentColor: '#6366F1',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
];

// Clean custom X and LinkedIn SVG icons matching Image 1
const XIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

interface TeamSectionProps {
  onMoreAboutUsClick?: () => void;
  onSelectMember?: (member: TeamMember) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  onMoreAboutUsClick,
  onSelectMember,
}) => {
  // Hovered / expanded card state (null when none expanded)
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Active / locked card for mobile tap
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scroll trigger progress for bottom indicator
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs for GSAP ScrollTrigger
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Determine which card is effectively expanded (hover takes precedence, then active tap)
  const currentExpandedId = hoveredId || activeId;

  // Setup GSAP ScrollTrigger Horizontal Scroll
  useLayoutEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current || !trackRef.current || !viewportRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const viewport = viewportRef.current!;
      const pinContainer = pinContainerRef.current!;

      // Calculate the maximum horizontal translation needed to show all 7 cards
      const calculateScrollDistance = () => {
        const overflow = track.scrollWidth - viewport.clientWidth;
        return Math.max(0, overflow + 80); // include padding buffer so the 7th card rests comfortably
      };

      // Horizontal translation tween scrubbed by vertical scroll
      const horizontalTween = gsap.to(track, {
        x: () => -calculateScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinContainer,
          // Starts pinning exactly when pinContainer hits near top (i.e. header title has scrolled out of view)
          start: 'top top+=20',
          // Scroll length matches horizontal track length
          end: () => `+=${Math.max(1000, calculateScrollDistance() * 1.35)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Recalculate on window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        horizontalTween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Manual scroll buttons for users who want to click arrows
  const handleScrollManual = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const currentX = gsap.getProperty(trackRef.current, 'x') as number;
    const step = 360;
    const maxScroll = -(trackRef.current.scrollWidth - (viewportRef.current?.clientWidth || 1000) + 80);
    const targetX = direction === 'left' ? Math.min(0, currentX + step) : Math.max(maxScroll, currentX - step);

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="team-section"
      className="relative w-full overflow-hidden bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] transition-colors duration-500 selection:bg-neutral-800 selection:text-white"
    >
      {/* ========================================================================= */}
      {/* 1. ARCHITECTURAL VERTICAL GRID DIVIDERS (Matching Image 1 Grid Aesthetic) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-4">
        <div className="border-r border-dashed border-neutral-300/60 dark:border-neutral-800/60 h-full" />
        <div className="border-r border-dashed border-neutral-300/60 dark:border-neutral-800/60 h-full" />
        <div className="border-r border-dashed border-neutral-300/60 dark:border-neutral-800/60 h-full" />
        <div className="border-r border-dashed border-neutral-300/60 dark:border-neutral-800/60 h-full" />
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTION HEADER (Scrolls out of view before horizontal scroll engages)  */}
      {/* ========================================================================= */}
      <div
        ref={headerRef}
        className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: + TEAM Badge and "Small team. Big standards." Headline */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            
            {/* + TEAM Badge */}
            <div className="flex items-center gap-1.5 text-xs sm:text-[13px] tracking-[0.18em] uppercase font-semibold text-neutral-500 dark:text-neutral-400">
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>TEAM</span>
            </div>

            {/* Headline matching Image 1: "Small team." (medium gray) & "Big standards." (bold high contrast) */}
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-[-0.03em] select-none">
              <span className="block font-bold text-neutral-500 dark:text-neutral-400 transition-colors">
                Small team.
              </span>
              <span className="block font-bold text-neutral-950 dark:text-white transition-colors">
                Big standards.
              </span>
            </h2>
          </div>

          {/* Right Column: Mission statement copy matching Image 1 */}
          <div className="lg:col-span-5 lg:pt-8 flex flex-col justify-end">
            <p className="font-neue text-base sm:text-lg md:text-xl text-[#525463] dark:text-[#A6A6AC] font-normal leading-relaxed max-w-[420px] transition-colors">
              Specialists working closely to transform ideas into meaningful,
              measurable outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PINNED CAROUSEL STAGE (Horizontally driven by ScrollTrigger)            */}
      {/* ========================================================================= */}
      <div
        ref={pinContainerRef}
        className="relative z-10 w-full min-h-[620px] sm:min-h-[660px] md:min-h-[700px] flex flex-col justify-between py-4"
      >
        {/* Subtle Watermark Across Background ("KUDOS" matching Image 1) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-full select-none pointer-events-none text-center overflow-hidden z-0">
          <span className="font-clash text-[18vw] font-black uppercase tracking-[-0.04em] text-neutral-900/[0.035] dark:text-white/[0.04] leading-none inline-block">
            NEOXIS
          </span>
        </div>

        {/* Top Controls Row: Progress indicator & Manual Nav Arrows */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between pb-4">

          {/* Quick Nav Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScrollManual('left')}
              className="w-9 h-9 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all text-neutral-800 dark:text-neutral-200 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollManual('right')}
              className="w-9 h-9 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all text-neutral-800 dark:text-neutral-200 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div ref={viewportRef} className="relative z-10 w-full overflow-hidden py-2">
          {/* Horizontally Moving Cards Track */}
          <div
            ref={trackRef}
            className="flex items-stretch gap-4 sm:gap-6 px-6 sm:px-10 lg:px-16 will-change-transform"
          >
            {TEAM_MEMBERS.map((member) => {
              const isExpanded = currentExpandedId === member.id;

              return (
                <div
                  key={member.id}
                  onMouseEnter={() => setHoveredId(member.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    setActiveId((prev) => (prev === member.id ? null : member.id));
                    onSelectMember?.(member);
                  }}
                  className={`group relative rounded-2xl cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
                    isExpanded
                      ? 'w-[320px] sm:w-[540px] md:w-[600px] lg:w-[640px]'
                      : 'w-[250px] sm:w-[280px] md:w-[305px] lg:w-[315px]'
                  }`}
                  style={{
                    // Slightly elevate expanded card
                    zIndex: isExpanded ? 30 : 10,
                  }}
                >
                  {/* Card Inner Wrapper */}
                  <div
                    className={`w-full h-full rounded-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                      isExpanded
                        ? 'bg-white dark:bg-[#13141D] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] border border-neutral-300 dark:border-neutral-700/80 p-3 sm:p-4'
                        : 'bg-transparent'
                    }`}
                  >
                    {/* ========================================================= */}
                    {/* EXPANDED STATE (Matching Image 2: Photo + Right Details)  */}
                    {/* ========================================================= */}
                    {isExpanded ? (
                      <div className="w-full flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6 h-[440px] sm:h-[480px]">
                        {/* Left: Full Color Portrait */}
                        <div className="relative w-full sm:w-[260px] md:w-[290px] h-[220px] sm:h-full rounded-xl overflow-hidden shrink-0 shadow-sm">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale-0 contrast-100 brightness-100 transition-all duration-500 scale-[1.02]"
                          />
                          {/* Category Tag overlay on image */}
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider text-white">
                            {member.category}
                          </div>
                        </div>

                        {/* Right: Details Pane (Stars, Quote, Accent Bar, Name, Role) */}
                        <div className="flex-1 flex flex-col justify-between py-1 sm:py-2 pr-1 sm:pr-2">
                          <div className="flex flex-col gap-3">
                            {/* 5 Amber Stars (Exact Image 2 Detail) */}
                            <div className="flex items-center gap-1 text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-amber-500 text-amber-500"
                                />
                              ))}
                            </div>

                            {/* Quote / Testimonial from Image 2 */}
                            <p className="font-neue text-sm sm:text-base leading-relaxed text-[#525463] dark:text-[#C5C6D0] font-normal pt-1">
                              "{member.quote}"
                            </p>

                            {/* Orange Accent Bar (Exact Image 2 Detail) */}
                            <div
                              className="w-12 h-[3px] rounded-full my-1 transition-all duration-300"
                              style={{ backgroundColor: member.accentColor || '#EA580C' }}
                            />
                          </div>

                          {/* Member Identity & Social Actions */}
                          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
                            <h4 className="font-neue text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                              {member.name}
                            </h4>
                            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-0.5">
                              {member.role}
                            </p>

                            {/* Quick Social & Connect Link */}
                            <div className="flex items-center justify-between mt-3 pt-2">
                              <div className="flex items-center gap-2">
                                <a
                                  href={member.socials.x}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-7 h-7 rounded-md border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-900 dark:hover:border-white transition-colors"
                                  aria-label="X Profile"
                                >
                                  <XIcon className="w-3 h-3" />
                                </a>
                                <a
                                  href={member.socials.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-7 h-7 rounded-md border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-900 dark:hover:border-white transition-colors"
                                  aria-label="LinkedIn Profile"
                                >
                                  <LinkedInIcon className="w-3.5 h-3.5" />
                                </a>
                              </div>

                              <span className="text-xs font-neue text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                                View bio &rarr;
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ========================================================= */
                      /* DEFAULT STATE (Matching Image 1: Grayscale Photo + Info)  */
                      /* ========================================================= */
                      <div className="w-full flex flex-col">
                        {/* Portrait Photo Container */}
                        <div className="relative w-full aspect-[3/4] sm:h-[400px] md:h-[440px] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 transition-all duration-300 group-hover:shadow-lg">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale contrast-[1.05] brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
                          />
                          
                          {/* Corner Hover Hint Badge */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-1">
                            <span>Hover to expand</span>
                          </div>
                        </div>

                        {/* Below-Photo Details Row (Matching Image 1 Layout) */}
                        <div className="pt-3.5 pb-1 flex items-start justify-between">
                          {/* Name & Role */}
                          <div className="flex flex-col">
                            <h4 className="font-neue text-sm sm:text-[15px] font-bold text-neutral-950 dark:text-white tracking-tight leading-snug">
                              {member.name}
                            </h4>
                            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-wide mt-0.5">
                              {member.role}
                            </p>
                          </div>

                          {/* Social Icons matching Image 1 right corner */}
                          <div className="flex items-center gap-2 pt-0.5">
                            <a
                              href={member.socials.x}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                              aria-label="X Profile"
                            >
                              <XIcon className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={member.socials.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                              aria-label="LinkedIn Profile"
                            >
                              <LinkedInIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SECTION FOOTER (Matching Image 1 Bottom Bar)                           */}
        {/* ========================================================================= */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-dashed border-neutral-300/80 dark:border-neutral-800/80 pt-6">
            
            {/* Left: "Behind every result is a team that cares." */}
            <div className="font-neue text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-normal">
              Behind every result is{' '}
              <strong className="font-bold text-neutral-950 dark:text-white">
                a team that cares.
              </strong>
            </div>

            {/* Right: "Built by specialists" + "More about us" Pill Button */}
            <div className="flex flex-col items-start sm:items-end gap-1.5">
              <span className="font-mono text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Built by specialists
              </span>

              {/* Technical Blueprint-styled "More about us" button */}
              <button
                onClick={onMoreAboutUsClick}
                className="group relative inline-flex items-center justify-between gap-4 px-5 py-2.5 rounded-lg border border-neutral-300/90 dark:border-neutral-700/80 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md text-neutral-900 dark:text-white font-neue text-sm font-medium hover:border-neutral-950 dark:hover:border-white active:scale-98 transition-all cursor-pointer shadow-sm"
              >
                {/* Micro CAD corner markers matching Image 1 */}
                <span className="absolute -top-1 -left-1 text-[9px] text-neutral-400 font-mono select-none">+</span>
                <span className="absolute -top-1 -right-1 text-[9px] text-neutral-400 font-mono select-none">+</span>
                <span className="absolute -bottom-1 -left-1 text-[9px] text-neutral-400 font-mono select-none">+</span>
                <span className="absolute -bottom-1 -right-1 text-[9px] text-neutral-400 font-mono select-none">+</span>

                <span>More about us</span>
                <MoreVertical className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
