import { LockOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import { resetPasswordApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();

  const onFinish = async ({ token, password }) => {
    try {
      const res = await resetPasswordApi(token, password);
      if (res.data?.EC === 0) {
        message.success('Đặt lại mật khẩu thành công!');
        navigate('/login');
      } else {
        message.error(res.data.EM);
      }
    } catch {
      message.error('Lỗi kết nối server');
    }
  };

  return (
    <div style={styles.container}>
      <Card title="Đặt lại mật khẩu" style={styles.card}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="token" label="Token" rules={[{ required: true }]}>
            <Input prefix={<KeyOutlined />} placeholder="Token từ email" />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu mới" rules={[{ required: true, min: 6 }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Xác nhận
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
