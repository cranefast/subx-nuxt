export default defineNuxtRouteMiddleware(() => {
  // 모바일 메뉴 이동 시 처리
  const layoutStore = useLayoutStore();
  layoutStore.isMobileMenu = false;
});
