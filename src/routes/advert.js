import express from 'express'
// import queryString from 'querystring'
// import mongodb from 'mongodb'
import Advert from '../models/advert'
// import body_parser from './middlewares/body_parser'
// const MongoClient = mongodb.MongoClient
// const url = 'mongodb://localhost:27017'
// const dbName = 'edu';
import * as AdvertController from '../controllers/advert'
// 创建一个路由容器，将所有的路由中间件挂载给路由容器
const router = express.Router()
router
    .post('/advert/add', AdvertController.AdvertAdd)
    .get('/advert/list', AdvertController.AdvertList)
    .get('/advert/one/:advertId', AdvertController.AdvertOne)
    .post('/advert/edit', AdvertController.AdvertEdit)
    .get('/advert/remove/:advertId', AdvertController.AdvertRemove)
    .get('/advert', AdvertController.AdvertShow)
    .get('/advert/add', AdvertController.AdvertShowAdd)
// 通过export default暴露的接口成员不能定义的同时直接暴露
export default router