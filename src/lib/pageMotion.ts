export const PAGE_EASE = [0.22, 1, 0.36, 1] as const;

export const pageReveal = (delay = 0, reduced = false) => ({
  hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.65, delay, ease: PAGE_EASE },
  },
});
