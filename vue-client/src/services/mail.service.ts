import axios from "axios";

export class MailService {
    static readonly routes = {
        mailSend: 'http://localhost:4000/mail/send'
    };

    static sendEmail(from: string, to: string, subject: string, text: string): Promise<any> {
        axios.defaults.headers.common["Accept"] = "application/json";

        return axios.post(MailService.routes.mailSend,
            { from, to, subject, text }
        );
    }
}