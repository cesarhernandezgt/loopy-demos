/* eslint-disable no-undef */
// Add Range Request support to fetching videos from cache
workbox.routing.registerRoute(
  /.*\.mp3/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
      new workbox.rangeRequests.Plugin(),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24,
        maxEntries: 100,
      }),
    ],
  }),
  "GET"
)

// workbox v5
// workbox.routing.registerRoute(
//   /.*\.mp4/,
//   new workbox.strategies.CacheFirst({
//     plugins: [
//       new workbox.cacheableResponse.CacheableResponsePlugin({
//         statuses: [200],
//       }),
//       new workbox.rangeRequests.RangeRequestsPlugin(),
//     ],
//   }),
//   'GET',
// );
