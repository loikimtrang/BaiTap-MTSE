import nodemailer from 'nodemailer';

export const sendResetEmail = async (to, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // hoặc 'hotmail', 'yahoo', hoặc SMTP server custom
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    const mailOptions = {
        from: `"Support" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Yêu cầu đặt lại mật khẩu',
        html: `<p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào link sau để tiếp tục:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>Liên kết hết hạn sau 15 phút.</p>`,
    };

    await transporter.sendMail(mailOptions);
};
