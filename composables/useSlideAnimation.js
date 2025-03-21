export function useSlideAnimation() {
  const onEnter = (el) => {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      el.style.height = el.scrollHeight + 'px';
    });
  };

  const onLeave = (el) => {
    el.style.height = el.scrollHeight + 'px';
    requestAnimationFrame(() => {
      el.style.height = '0px';
    });
  };

  return {
    onEnter,
    onLeave,
  };
}
