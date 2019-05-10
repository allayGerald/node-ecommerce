const fs = require('fs');
const path = require('path');

const products = [];

module.exports = class product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );
        fs.readFile(p, (error, content) => {
            let prod = [];
            if(!error) {
                prod = JSON.parse(content);
            }
            prod.push(this);

            fs.writeFile(p, JSON.stringify(prod), (error) => {
                console.log(error);
            })
        });
    }

    static fetchAll(cb) {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );
        fs.readFile(p, (error, fileContent)=> {
            if(error) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
}