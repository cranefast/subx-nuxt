export default defineEventHandler(async (event) => {
  const { url } = event.node.req;

  // /api 로 시작하는 요청을 외부 API로 프록시
  if (url.startsWith('/api')) {
    const targetUrl = `http://localhost:8080${url.replace('/api', '')}`;
    return await $fetch(targetUrl, {
      method: event.node.req.method,
      headers: event.node.req.headers,
    });
  }
});
