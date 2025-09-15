import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AuthContext } from '../components/context/auth.context';
import instance from '../utils/axios.customize';

const { Header } = Layout;

// API lấy danh mục
export const getCategoryListApi = () => instance.get('/categories');

// type cho category
type Category = { id: string | number; name: string };

export default function AppHeader() {
  const { setUser, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoryListApi();
        const data = res.data ?? []; // ✅ sửa tại đây
        console.log('🔵 [Axios Response] data:', data);
        setCategories(data);
      } catch (err) {
        console.error('🔴 Lỗi khi load categories:', err);
      }
    };
    fetchCategories();
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setAuth(false);
    window.location.href = '/login';
  };

  const handleCategoryClick = (key: string) => {
    navigate(`/products?categoryId=${key}`);
  };

  // items cho dropdown
  const items: MenuProps['items'] = categories.map((c) => ({
    key: String(c.id),
    label: c.name,
  }));

  return (
    <Header
      style={{
        background: '#001529',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        TRANG CHỦ
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <Button type="default" onClick={() => navigate('/user-info')}>
          Thông tin
        </Button>

        <Button type="primary" danger onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
    </Header>
  );
}
