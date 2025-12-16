import nodemailer from 'nodemailer'

export async function sendEmail(recipientEmail: string, htmlContent: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_APP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: recipientEmail,
        subject: 'Relatório de Eventos',
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Relatório enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar relatório:', error);
    }
}