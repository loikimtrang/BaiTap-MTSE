import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form ở đây
    console.log('Form data:', formData);
    alert('Cảm ơn bạn đã liên hệ!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Liên hệ</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Thông tin liên hệ</h3>
            <div className="info-item">
              <strong>Email:</strong> tkloi@gmail.com
            </div>
            <div className="info-item">
              <strong>Điện thoại:</strong> +84 12345678
            </div>
            <div className="info-item">
              <strong>Địa chỉ:</strong> Hồ Chí Minh, Việt Nam
            </div>
            <div className="social-links">
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">Facebook</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Tên của bạn"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Tin nhắn"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Gửi tin nhắn</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
