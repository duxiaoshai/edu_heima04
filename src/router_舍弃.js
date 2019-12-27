import express from 'express'
// import queryString from 'querystring'
// import mongodb from 'mongodb'
import Advert from './models/advert'
// import body_parser from './middlewares/body_parser'
// const MongoClient = mongodb.MongoClient
// const url = 'mongodb://localhost:27017'
// const dbName = 'edu';


// 创建一个路由容器，将所有的路由中间件挂载给路由容器
const router = express.Router()
router.get('/', (req, res, next) => {
    // fs.readFile('sahdjkha', (err, data) => {
    //     if (err) {
    //         return next(err)
    //     }
    //     res.end('success')
    // })
    res.render('index.html')
})
// router.get('/aa', (req, res, next) => {
//     try {
//         JSON.parse('{akjhdj}')
//     } catch(e){
//         next(e)
//     }
// })

/*
POST /advert/add
body:{
        title:body.title,
        image:body.image,
        link:body.link,
        start_time:body.start_time,
        end_time:body.end_time,
    }
*/
router.post('/advert/add', (req, res, next) => {
    // //1、 打开链接
    // MongoClient.connect(url, (err, client) => {
    //     const db = client.db(dbName);
    //     if (err) {
    //         //当错误发生的时候  调用next  将当前错误对象传递给next
    //         // 然后就会被后面的app.use((err,req,res,next))中间件匹配到
    //         //而且该错误处理中间件一定要放在所有的路由之后
    //         return next(err)
    //     }
    //     //2、操作数据库
    //     db.collection('adverts')
    //         .insertOne(req.body, (err, result) => {
    //             if (err) {
    //                 throw err
    //             }
    //             // console.log(result)
    //             res.json({
    //                 err_code: 0
    //             })
    //         })
    //     //3、关闭数据库
    //     client.close()
    // })


    const body = req.body
    const advert = new Advert({
        title: body.title,
        image: body.image,
        link: body.link,
        start_time: body.start_time,
        end_time: body.end_time,
    })
    advert.save((err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0
        })
    })
})


router.get('/advert/list', (req, res, next) => {
    Advert.find((err, docs) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: docs
        })
    })
})

router.get('/advert/one/:advertId', (req, res, next) => {
    Advert.findById(req.params.advertId, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    })
})


router.post('/advert/edit', (req, res, next) => {
    Advert.findById(req.body.id, (err, advert) => {
        if (err) {
            return next(err)
        }
        const body = req.body
        advert.title = body.title
        advert.image = body.image
        advert.link = body.link
        advert.start_time = body.start_time
        advert.end_time = body.end_time
        advert.last_modified = Date.now()
        advert.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                err_code: 0
            })
        })
    })
})


router.get('/advert/remove/:advertId', (req, res, next) => {
    Advert.remove({ _id: req.params.advertId }, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0
        })
    })
})



// 通过export default暴露的接口成员不能定义的同时直接暴露
export default router