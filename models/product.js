const db = require('../util/database');

module.exports = class product {
    constructor(data) {
        this.title = data.title;
        this.imageUrl = data.imageUrl;
        this.description = data.description;
        this.price = data.price;
    }

    save() {
    return   db.execute('INSERT INTO products (title, image_url, description, price) VALUES (?, ?, ?, ?)', 
    [this.title, this.imageUrl, this.description, this.price ]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');   
    }

    
  static findById(prodId) {
   return db.execute('SELECT * FROM products WHERE id = ?', [prodId]);
  }
}