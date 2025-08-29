import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import { useContext } from 'react';
import { loginApi } from '../utils/api';
import { AuthContext } from '../components/context/auth.context';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { setUser, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await loginApi(values.email, values.password);
      if (res.data?.DT?.token) {
        localStorage.setItem('access_token', res.data.DT.token);
        setUser(res.data.DT.user);
        setAuth(true);
        message.success('Đăng nhập thành công!');
        navigate('/');
      } else {
        message.error(res.data?.EM || 'Đăng nhập thất bại');
      }
    } catch (err) {
      message.error('Lỗi kết nối server');
    }
  };

  return (
    <div style={styles.container}>
      <Card title="Đăng nhập hệ thống" style={styles.card}>
        <Form name="login_form" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate('/forgot')}>
              Quên mật khẩu?
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: '#f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 400,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: 8
  }
};
