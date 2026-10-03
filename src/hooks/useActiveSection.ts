import { useEffect, useState } from 'react';

/**
 * Id of the last element in `ids` whose top has scrolled within `offset` px of the viewport top,
 * for "you are here" highlighting in a table of contents. `ids` must be a stable array.
 */
export function useActiveSection(ids: readonly string[], offset = 200) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      const passed = ids.filter((id) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        return top !== undefined && top <= offset;
      });
      setActiveId(passed.at(-1) ?? ids[0]);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [ids, offset]);

  return activeId;
}
