import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
// import router from './router'
import indexRouter from './routes/index'
import adverRouter from './routes/advert'
import bodyParser from './middlewares/body_parser'
import errLog from './middlewares/error_log'
const app = express()

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

//配置使用nunjucks引擎
nunjucks.configure(config.viewPath, {
  autoescape: true,
  express: app,
  noCache:true
})
//解析处理表单post请求体中间件
// app.use((req,res,next) => {
//   //request由于表单post请求可能会携带大量的数据，所以再请求提交的时候会分为多次提交
//   //具体分为多少次进行提交不一定，取决于数据量的大小
//   //在node中对于处理这种不确定的数据使用事件的形式处理
//   //这里可以通过监听req对象的data事件，然后通过对应的回调处理函数中的参数，chunk拿到每一次接收到的数据
//   //data事件触发多少次不一定，
//   //当数据接收完毕之后会自动触发req对象的end事件，然后可以在end事件中使用接受到的表单post请求体

// })

// 挂载解析表单post请求体中间件
app.use(bodyParser)
// 挂载路由容器  （路由容器中组织了网站功能处理路由中间件）
// app.use(router)
app.use(indexRouter)
app.use(adverRouter)
// 全局处理错误
app.use(errLog)
app.listen(3000, () => {
  console.log('server is running at port 3000...')
})
