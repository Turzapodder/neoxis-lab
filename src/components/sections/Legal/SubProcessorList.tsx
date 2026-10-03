import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SUB_PROCESSORS } from '@/data/privacy';

/** Grid of third-party services that process data, each with its own privacy policy link. */
export const SubProcessorList: React.FC = () => (
  <div className="mt-8 space-y-4">
    <h4 className="font-clash text-base font-semibold text-neutral-950 uppercase tracking-wide">
      Verified Studio Sub-processors
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SUB_PROCESSORS.map((processor) => (
        <div
          key={processor.name}
          className="rounded-[20px] bg-neutral-50/80 border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-3 hover:bg-neutral-50 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-clash text-base font-bold text-neutral-950">{processor.name}</span>
              <span className="text-[11px] font-clash px-2 py-0.5 rounded-full bg-neutral-200/80 text-neutral-700">
                {processor.category}
              </span>
            </div>
            <p className="font-neue text-xs text-neutral-600 leading-relaxed mt-2">{processor.purpose}</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] text-[11px] font-neue text-neutral-500">
            <span>Location: {processor.location}</span>
            <a
              href={processor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-clash font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
            >
              <span>Policy</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);
