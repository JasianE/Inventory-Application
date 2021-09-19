const category = require('../models/category')
const item = require('../models/item')

exports.categoryList = function(req, res, next){
    category.find({_id: req.params.Id}).exec(function(err, lists){
        if(err) return next(err)
        item.find({category: req.params.Id}).exec(function(err, items){
            if(err) return next(err)
            console.log(lists, items)
            res.render('category', {title: lists[0].name, items: items, id: req.params.Id, description: lists[0].description})
        })
    })
    
}
exports.list = function(req, res, next){
    category.find().exec(function(err, lists){
        if(err) return nexadst(err)
        res.render('categoryList', {categories: lists})
    })
}