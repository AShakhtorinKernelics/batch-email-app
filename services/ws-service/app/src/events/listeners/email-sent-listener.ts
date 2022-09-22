import { Message } from "node-nats-streaming";
import { Listener, EmailSentEvent, Subjects } from "../../common/src";

export class EmailSentListener extends Listener<EmailSentEvent> {
    subject: Subjects.EmailSent = Subjects.EmailSent;
    queueGroupName = 'qwe-service';

    onMessage(data: EmailSentEvent['data'], msg: Message) {
        console.log('Event data!', data);
        msg.ack();
    }
}
