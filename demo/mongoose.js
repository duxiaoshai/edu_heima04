const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
//创建一个模型架构,设计一个数据结构和约束
const studentSchema = mongoose.Schema({
    name: String,
    age: Number
})
//2、通过mongoose。model（）将架构发布为一个模型（可以把模型认为是一个构造函数）
//第一个参数  给你的集合取一个名字 这个名字最好使用帕斯卡命名法   大写字母开头
//例如你的集合名字 persons 名字取为 Person，但是最终mongoose会自动帮你把Person转换为persons
//第二个参数就是传递一个模型架构
const Student = mongoose.model('Student', studentSchema)
//3、通过操作模型去操作你的数据库
const s1 = new Student({
    name: 'Jack',
    age: 18
})
//通过操作模型实例完成对数据库的操作
s1.save((err,result)=>{
    if(err){
        throw err 
    }
    console.log(result)
})