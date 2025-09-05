import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AuthContext } from '../components/context/auth.context';

const { Header } = Layout;

const productCategories = [
  { key: '1', label: 'Điện thoại' },
  { key: '2', label: 'Laptop' },
  { key: '3', label: 'Phụ kiện' },
  { key: '4', label: 'Thiết bị thông minh' },
];

const menuItems = productCategories.map(item => ({
  key: item.key,
  label: <span>{item.label}</span>,
}));

export default function AppHeader() {
  const { setUser, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setAuth(false);
    window.location.href = '/login';
  };

  const productMenu = <Menu items={menuItems} />;

  return (
    <Header style={{ background: '#001529', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
        TRANG CHỦ
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <Dropdown overlay={productMenu} placement="bottomLeft">
          <Button type="default">
            Danh mục sản phẩm <DownOutlined />
          </Button>
        </Dropdown>

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
