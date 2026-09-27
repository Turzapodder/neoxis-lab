import type Lenis from 'lenis';

// Holds the running Lenis instance so scroll helpers can reach it without globals.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
