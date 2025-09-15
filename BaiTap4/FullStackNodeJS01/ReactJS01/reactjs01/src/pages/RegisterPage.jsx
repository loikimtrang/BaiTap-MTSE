import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import { createUserApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await createUserApi(values.name, values.email, values.password);
      if (res.data?.EC === 0) {
        message.success('Đăng ký thành công, vui lòng đăng nhập!');
        navigate('/login');
      } else {
        message.error(res.data.EM);
      }
    } catch (err) {
      message.error('Lỗi kết nối server!');
    }
  };

  return (
    <div style={styles.container}>
      <Card title="Đăng ký tài khoản" style={styles.card}>
        <Form name="register_form" layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Tên hiển thị" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="Tên của bạn" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, min: 6 }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng ký
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate('/login')}>
              Đã có tài khoản? Đăng nhập
            </Button>
          </Form.Item>
        </Form>

      </Card>
    </div>
  );
}

const styles = {
  container: { height: '100vh', background: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { width: 400, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
};
