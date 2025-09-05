import { Layout, Typography } from 'antd';
import AppHeader from '../components/AppHeader';

const { Content } = Layout;
const { Title } = Typography;

export default function HomePage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Content style={{ padding: '40px', textAlign: 'center' }}>
        <Title>Chào mừng đến với cửa hàng!</Title>
        <p>Chọn danh mục từ menu để khám phá sản phẩm.</p>
      </Content>
    </Layout>
  );
}
