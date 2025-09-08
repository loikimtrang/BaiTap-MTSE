// scripts/deleteAllProducts.js

const db = require('../models'); // dùng require thay vì import

const deleteAllProducts = async () => {
  await db.sequelize.sync();
  await db.Product.destroy({ where: {}, truncate: true });
  console.log('✅ Đã xóa toàn bộ sản phẩm trong MySQL');
  process.exit();
};

deleteAllProducts();
