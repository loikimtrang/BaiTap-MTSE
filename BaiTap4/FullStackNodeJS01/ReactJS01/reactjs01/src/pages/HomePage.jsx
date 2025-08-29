import { useContext, useEffect, useState } from 'react';
import { getAccountApi } from '../utils/api';
import { AuthContext } from '../components/context/auth.context';
import { Button, Card, Spin, Typography } from 'antd';
const { Title, Text } = Typography;

export default function HomePage() {
  const { user, setUser, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getAccountApi();
      if (res.data?.id) {
        setUser(res.data);
        setAuth(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setAuth(false);
    window.location.href = '/login';
  };

  if (loading) return <Spin fullscreen />;

  return (
    <div style={{ height: '100vh', background: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Trang chủ người dùng" style={{ width: 500 }}>
        <Title level={4}>Xin chào, {user?.name}</Title>
        <Text>Email: {user?.email}</Text><br />
        <Text>Vai trò: {user?.role}</Text><br />
        <Button type="primary" danger style={{ marginTop: 20 }} onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Card>
    </div>
  );
}
