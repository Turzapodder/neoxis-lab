import React from 'react';
import type { SelectedProject } from '@/types/content';

interface ProjectTileProps {
  project: SelectedProject;
  /** Responsive height classes for the image frame. */
  heightClass: string;
  className?: string;
  onSelect?: (project: SelectedProject) => void;
}

export const ProjectTile: React.FC<ProjectTileProps> = ({ project, heightClass, className = '', onSelect }) => (
  <div onClick={() => onSelect?.(project)} className={`${className} group flex flex-col cursor-pointer select-none`}>
    <div
      className={`relative w-full ${heightClass} rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-950 shadow-sm border border-neutral-200/50`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
    </div>

    <div className="pt-3.5 pb-1 flex items-center justify-between text-neutral-900">
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-xs sm:text-sm text-neutral-400 font-medium">{project.num}</span>
        <h3 className="font-neue text-sm sm:text-base font-bold text-neutral-950 tracking-tight group-hover:opacity-80 transition-opacity">
          {project.title}
        </h3>
      </div>
      <span className="font-mono text-xs sm:text-sm text-neutral-400">{project.year}</span>
    </div>
  </div>
);
