const fs = require('fs');
const path = require('path');

const products = [];

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
const getProductsFromFile = (cb) => {
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class product {
    constructor(data) {
        this.title = data.title;
        this.imageUrl = data.imageUrl;
        this.description = data.description;
        this.price = data.price;
    }

    save() {
        this.id = Math.random();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (error) => {
                console.log(error);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
}