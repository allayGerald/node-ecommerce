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
    constructor(t) {
        this.title = t;
    }

    save() {
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
}