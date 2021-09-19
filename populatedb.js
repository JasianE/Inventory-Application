
// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
const Category = require('./models/category')
const Item = require('./models/item')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let categories = []
let items = []

function categoryCreate(name, desc, cb) {
  category_detail = {name: name}
  category_detail.description = desc ? desc : 'description'

  const category = new Category(category_detail)
       
  category.save(function (err) {
    if (err) {
      return err
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}

function itemCreate(name, desc, stock, price, category, cb) {
  itemd = {name: name, stock: stock, price: price, category: category}
  itemd.desc = desc ? desc: 'description'

  const iteme = new Item(itemd);
       
  iteme.save(function (err) {
    if (err) {
      return err
    }
    console.log('New Item: ' + iteme);
    items.push(iteme)
    cb(null, item);
  }   );
}

function createCategories(cb) {
    async.parallel([
        function(callback) {
            categoryCreate('Derek Jeter', 
            'South Park: The Fractured but Whole d.', 
            callback);
        },
        function(callback) {
            categoryCreate('Esam', 
            'Pikachu? Busted. Bute/', 
            callback);
          },
        function(callback) {
            categoryCreate('gamedunkey', 
            'Sonic the Hedgehog. One of the greatest', 
            callback);
          },
        function(callback) {
          categoryCreate('New Kyle', 
          'Cojusin ksue;111',
          callback);
        },
        ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate(
            'Peter Griffin', 
            'neyheheheheh', 
            102, 
            4, 
            categories[0],
            callback)
        },
        function(callback) {
          itemCreate(
            'Petear Griffin', 
            'neyheheheheh', 
            102, 
            4, 
            categories[1],
            callback)
        },
        function(callback) {
          itemCreate(
            'Petrer Griffin', 
            'neyheheheheh', 
            102, 
            4, 
            categories[2],
            callback)
        },
        function(callback) {
          itemCreate(
            'Pester Griffin', 
            'neyheheheheh', 
            102, 
            4, 
            categories[3],
            callback)
        },
        
        ],
        // Optional callback
        cb);
}



async.series([
    createCategories, 
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+ categories);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



