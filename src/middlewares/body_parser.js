import queryString from 'querystring'
export default (req, res, next) => {
  if (req.method.toLowerCase() === 'get') {
    return next()
  }

  if (req.headers['content-type'].startsWith('multipart/form-data')) {
    return next()
  }

  let data = ''
  req.on('data', chunk => {
    data += chunk
  })
  req.on('end', () => {
    // 手动给req对象挂载一个body属性，值就是当前表单post请求体对象 
    // 在后续的中间件中就可以直接使用req.body
    // 因为在同一个请求当中，流通的都是同一个req和res对象
    req.body = queryString.parse(data)
    // console.log(data)
    next()
  })
}