import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Menu } from 'antd';
import AppHeader from '../components/AppHeader';
import { getCategoryListApi } from '../components/AppHeader'; // tái sử dụng API

const { Sider, Content } = Layout;
const { Title } = Typography;

export default function HomePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // ✅ KHÔNG cần type

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoryListApi();
        const data = res.data ?? [];
        setCategories(data);
      } catch (err) {
        console.error('❌ Lỗi khi lấy danh mục:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (key) => {
    navigate(`/products?categoryId=${key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            items={categories.map((c) => ({
              key: String(c.id),
              label: c.name,
            }))}
            onClick={({ key }) => handleCategoryClick(key)}
          />
        </Sider>
        <Content style={{ padding: '40px', textAlign: 'center' }}>
          <Title>Chào mừng đến với cửa hàng!</Title>
          <p>Chọn danh mục từ menu bên trái để khám phá sản phẩm.</p>
        </Content>
      </Layout>
    </Layout>
  );
}
