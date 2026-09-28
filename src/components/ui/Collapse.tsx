import React from 'react';

interface CollapseProps {
  open: boolean;
  id?: string;
  children: React.ReactNode;
}

/** Animates height between 0 and auto using the grid-rows technique. */
export const Collapse: React.FC<CollapseProps> = ({ open, id, children }) => (
  <div
    id={id}
    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
    }`}
  >
    <div className="overflow-hidden">{children}</div>
  </div>
);
