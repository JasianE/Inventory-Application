const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const Category = require('../models/category');
const Item = require('../models/item');

/* GET home page. */
router.get('/', categoryController.list) 
router.post('/more', (req,res,next) => {
  res.redirect('/categories/' + req.body.hid)
  next()
})

router.get('/categories/:Id', categoryController.categoryList)
router.post('/add', (req,res,next) => {
  const item = new Item({
    name: req.body.itemname,
    description: req.body.description,
    price: parseInt(req.body.price, 10),
    stock: parseInt(req.body.stock, 10),
    category: req.body.hid
  }).save(err => {
    if(err) {
      console.log(err)
      return next(err)
    }
    next()
  })
  res.redirect('/')
  next()
})
router.post('/category', (req,res,next) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description
  }).save(err => {
    if(err){
      return next(Err)
    }
    next()
  })
  res.redirect('/')
})

module.exports = router;
