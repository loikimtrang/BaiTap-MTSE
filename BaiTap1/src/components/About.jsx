import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>Thông tin</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Xin chào! Tôi là một mobile developer đam mê với việc tạo ra những 
              giao diện đẹp và tương tác tốt. Tôi chuyên Android - Java và IOS - Swift
            </p>
            <div className="skills">
              <h3>Kỹ năng:</h3>
              <ul>
                <li>Java Android</li>
                <li>Swift Ios</li>
                <li>Git & GitHub</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
