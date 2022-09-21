const nodemailer = require('nodemailer');
require('dotenv').config();
const {SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASS,API_URL } = process.env;
class mailService{
    constructor  (){
    
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure:true,
            auth:{
                user: SMTP_USER,
                pass: SMTP_PASS
            }
           
        });
 
    }
    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: SMTP_USER,
            to,
            subject: "Активация аккаунта на " + API_URL, 
            text:"",
            html:
            `
                 <div>
                    <h1> Для активации перейдите по сслыке </h1>
                    <a href="${link}">${link}</a>
                    
                </div>
            `
        }); 
    }
}
module.exports = new mailService();