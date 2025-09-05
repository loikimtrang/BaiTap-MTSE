const fs = require('fs');

const products = Array.from({ length: 40 }, (_, i) => ({
  name: `Macbook ${i + 1}`,
  price: 1000 + i + 1,
  description: `Mô tả sản phẩm máy laptop ${i + 1}`,
  imageUrl: `https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/335369/macbook-air-13-inch-m4-12-638769625435319422-750x500.jpg`,
  categoryId: 3
}));

fs.writeFileSync('products-iphone.json', JSON.stringify(products, null, 2));
