import nodemailer from "nodemailer";

class MailerService {
	transporter;
	email = "";
	password = "";

	constructor() {
		this.email = process.env.SMTP_EMAIl || "";
		this.password = process.env.SMTP_PASSWORD || "";

		this.transporter = nodemailer.createTransport({
			host: "smtp.mail.ru",
			port: 465,
			secure: true,
			auth: {
				user: this.email,
				pass: this.password
			}
		});
	}

	async sendMailToUser(to: string, html: string, subject: string) {
		const mailOptions = {
			from: this.email,
			to,
			html,
			subject,
			text: ""
		};

		try {
			const info = await this.transporter.sendMail(mailOptions);

			return `Email sent: ${info.response}`;
		} catch (e) {
			return null;
		}
	}
}

export default new MailerService();
