const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = function(app){
//     app.use(
//         createProxyMiddleware('/analysis' , {
//             target: 'http://127.0.0.1:5000',
//             changeOrigin: true,
//         }),
//         createProxyMiddleware('/api/gen' , {
//             target: 'http://127.0.0.1:5000',
//             changeOrigin: true,
//         }),
//         createProxyMiddleware('/api/repu' , {
//             target: 'http://127.0.0.1:5000',
//             changeOrigin: true,
//         })
//
//     )
// }

module.exports = function(app){
  app.use(
    createProxyMiddleware('/analysis' , {
      target: 'http://192.168.0.201:5000/',
      changeOrigin: true,
    }),
    createProxyMiddleware('/api/gen' , {
      target: 'http://192.168.0.201:5000/',
      changeOrigin: true,
    }),
    createProxyMiddleware('/api/repu' , {
      target: 'http://192.168.0.201:5000/',
      changeOrigin: true,
    })

  )
}
