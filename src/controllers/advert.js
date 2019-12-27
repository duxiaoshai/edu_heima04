import Advert from '../models/advert'
import formidable from 'formidable'
import config from '../config'
import { basename } from 'path'
export function AdvertAdd(req, res, next) {
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
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadDir // 文件上传接受的目录路径
    form.keepExtensions = true //保持文件原始后缀名
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err)
        }
        const body = fields
        // console.log(files.image.path)
        body.image = basename(files.image.path)
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

}
export function AdvertList(req, res, next) {
    Advert.find((err, docs) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: docs
        })
    })
}
export function AdvertOne(req, res, next) {
    Advert.findById(req.params.advertId, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    })
}
export function AdvertEdit(req, res, next) {
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
}
export function AdvertRemove(req, res, next) {
    Advert.remove({ _id: req.params.advertId }, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0
        })
    })
}
export function AdvertShow(req, res, next) {
    const page = Number.parseInt(req.query.page, 10)
    const pageSize = 5
    Advert
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, adverts) => {
            if (err) {
                throw err
            }
            console.log(adverts)
            Advert.count((err, count) => {
                if (err) {
                    return next(err)
                }
                const totalPage = Math.ceil(count / pageSize); //总页码
                res.render('advert_list.html', { adverts, totalPage, page })
            })
        })
}
export function AdvertShowAdd(req, res, next) {
    res.render('advert_add.html')
}