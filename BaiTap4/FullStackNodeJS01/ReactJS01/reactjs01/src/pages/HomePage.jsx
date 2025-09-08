import { useEffect, useState } from 'react';
import { Layout, Typography, Menu, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import { getCategoryListApi } from '../components/AppHeader';
import { getProductListApi } from '../utils/productApi';
import { Input, Slider, Checkbox, Button } from 'antd';
import { searchProductsFuzzyApi } from '../utils/productApi';



const { Sider, Content } = Layout;
const { Title } = Typography;

export default function HomePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const PAGE_SIZE = 20;
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [sortByViews, setSortByViews] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoryListApi();
        const data = res.data ?? [];
        setCategories(data);

        if (data.length > 0) {
          const firstCategoryId = data[0].id;
          setSelectedCategory(firstCategoryId);
          fetchProductsByCategory(firstCategoryId, 1);
        }
      } catch (err) {
        console.error('❌ Lỗi khi lấy danh mục:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleFilterSearch = async (page = 1) => {
    setCurrentPage(page);

    try {
      const res = await searchProductsFuzzyApi({
        categoryId: selectedCategory,
        keyword: searchText,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        hasDiscount,
        sortBy: sortByViews ? 'views_desc' : undefined,
        page,
        limit: PAGE_SIZE,
      });

      const data = res.data?.data;
      setProducts(data?.items ?? []);
      setTotalItems(data?.totalItems ?? 0);
    } catch (err) {
      console.error('❌ Lỗi khi tìm kiếm/lọc sản phẩm:', err);
    }
  };

  const fetchProductsByCategory = async (categoryId, page = 1) => {
    try {
      const res = await getProductListApi({
        categoryId,
        page,
        limit: PAGE_SIZE,
      });
      const data = res.data?.data;
      setProducts(data?.items ?? []);
      setTotalItems(data?.totalItems ?? 0);
    } catch (err) {
      console.error('❌ Lỗi khi lấy sản phẩm:', err);
    }
  };

  // Khi click danh mục
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    fetchProductsByCategory(categoryId, 1);
  };

  // Khi đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);

    if (searchText || hasDiscount || sortByViews || priceRange[0] > 0 || priceRange[1] < 10000000) {
      handleFilterSearch(page);
    } else if (selectedCategory) {
      fetchProductsByCategory(selectedCategory, page);
    }
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Menu
              mode="inline"
              selectedKeys={selectedCategory ? [String(selectedCategory)] : []}
              style={{ borderRight: 0 }}
              items={categories.map((c) => ({
                key: String(c.id),
                label: c.name,
              }))}
              onClick={({ key }) => handleCategoryClick(key)}
            />

            <div style={{ padding: 16, overflowY: 'auto' }}>
              <Input.Search
                placeholder="Tìm sản phẩm..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={() => handleFilterSearch(1)}
                allowClear
                style={{ marginBottom: 16 }}
              />

              <div style={{ marginBottom: 16 }}>
                <strong>Khoảng giá:</strong>
                <Slider
                  range
                  step={100000}
                  min={0}
                  max={10000000}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value)}
                />
                <div>{priceRange[0].toLocaleString()} ₫ - {priceRange[1].toLocaleString()} ₫</div>
              </div>

              <Checkbox
                checked={hasDiscount}
                onChange={(e) => setHasDiscount(e.target.checked)}
                style={{ marginBottom: 8 }}
              >
                Có khuyến mãi
              </Checkbox>

              <Checkbox
                checked={sortByViews}
                onChange={(e) => setSortByViews(e.target.checked)}
              >
                Sắp xếp theo lượt xem
              </Checkbox>

              <Button
                type="primary"
                block
                style={{ marginTop: 16 }}
                onClick={() => handleFilterSearch(1)}
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </Sider>

        <Content style={{ padding: '40px' }}>
          <Title level={2} style={{ textAlign: 'center' }}>
            {selectedCategory ? 'Sản phẩm' : 'Chào mừng đến với cửa hàng!'}
          </Title>

          {selectedCategory ? (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {products.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      border: '1px solid #eee',
                      borderRadius: 8,
                      padding: 16,
                      width: 250,
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ width: '100%', height: 160, objectFit: 'cover', marginBottom: 8 }}
                    />
                    <h3>{product.name}</h3>
                    <p style={{ color: 'gray' }}>{product.description}</p>
                    <p style={{ fontWeight: 'bold', color: 'green' }}>{product.price.toLocaleString()} ₫</p>
                  </div>
                ))}
              </div>

              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={totalItems}
                onChange={handlePageChange}
                style={{ textAlign: 'center', marginTop: 40 }}
              />
            </>
          ) : (
            <p style={{ textAlign: 'center' }}>
              Chọn danh mục từ menu bên trái để khám phá sản phẩm.
            </p>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
