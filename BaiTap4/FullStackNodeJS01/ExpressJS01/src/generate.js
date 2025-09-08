const fs = require('fs');

const generateProducts = (categoryId, namePrefix, imageUrl) => {
  return Array.from({ length: 40 }, (_, i) => ({
    name: `${namePrefix} ${i + 1}`,
    price: 500 + categoryId * 200 + i * 10, // Giá dao động
    description: `Mô tả sản phẩm ${namePrefix.toLowerCase()} số ${i + 1}`,
    imageUrl,
    categoryId,
    views: Math.floor(Math.random() * 500), // Random lượt xem
    hasDiscount: Math.random() < 0.5 // Ngẫu nhiên có giảm giá hay không
  }));
};

// Dữ liệu theo từng danh mục
const phones = generateProducts(
  1,
  'iPhone',
  'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329149/iphone-16-pro-max-titan-sa-mac-1-638638962337813406-750x500.jpg'
);

const tablets = generateProducts(
  2,
  'iPad',
  'https://cdn.tgdd.vn/Products/Images/522/325517/ipad-pro-13-inch-m4-wifi-sliver-1-750x500.jpg'
);

const laptops = generateProducts(
  3,
  'Macbook',
  'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/335369/macbook-air-13-inch-m4-12-638769625435319422-750x500.jpg'
);

// Tổng hợp tất cả sản phẩm
const allProducts = [...phones, ...tablets, ...laptops];

// Ghi vào file JSON
fs.writeFileSync('products.json', JSON.stringify(allProducts, null, 2), 'utf-8');
console.log('✅ Đã tạo file products.json với 120 sản phẩm.');
