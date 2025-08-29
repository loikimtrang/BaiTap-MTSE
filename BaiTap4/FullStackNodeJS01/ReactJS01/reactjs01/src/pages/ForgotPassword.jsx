import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import { forgotPasswordApi } from '../utils/api';

export default function ForgotPassword() {
  const onFinish = async ({ email }) => {
    try {
      const res = await forgotPasswordApi(email);
      if (res.data?.DT?.token) {
        message.success(`Token phục hồi: ${res.data.DT.token}`);
      } else {
        message.error(res.data.EM || 'Thất bại');
      }
    } catch {
      message.error('Lỗi server');
    }
  };

  return (
    <div style={styles.container}>
      <Card title="Khôi phục mật khẩu" style={styles.card}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email đăng ký" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi token khôi phục
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const styles = {
  container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' },
  card: { width: 400, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
};
