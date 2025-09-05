import { useContext } from 'react';
import { AuthContext } from '../components/context/auth.context';
import { Card, Typography, Layout } from 'antd';
import AppHeader from '../components/AppHeader';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function UserInfoPage() {
    
    const { user, setUser, isAuthenticated, setAuth } = useContext(AuthContext) as {
        user: User | null;
        setUser: (u: User | null) => void;
        isAuthenticated: boolean;
        setAuth: (b: boolean) => void;
    };


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Content style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                <Card title="Thông tin người dùng" style={{ width: 500 }}>
                    <Title level={4}>Xin chào, {user?.name}</Title>
                    <Text>Email: {user?.email}</Text><br />
                </Card>
            </Content>
        </Layout>
    );
}
