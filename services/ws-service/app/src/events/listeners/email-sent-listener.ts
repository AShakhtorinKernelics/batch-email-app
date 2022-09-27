import { Message } from "node-nats-streaming";
import { Listener, EmailSentEvent, Subjects } from "../../common/src";
import { Connection } from "../../models/connection";

export class EmailSentListener extends Listener<EmailSentEvent> {
    subject: Subjects.EmailSent = Subjects.EmailSent;
    queueGroupName = 'qwe-service';

    async onMessage(data: EmailSentEvent['data'], msg: Message) {
        const userId = data.usedId;

        const connection = await Connection.findByUserId(userId);
        if (connection) {
            connection.ws.send(
                JSON.stringify({
                    message: {
                        success: data.success,
                        batchSize: data.batchSize,
                        batchId: data.batchId || null
                    }
                })
            );
        }
        msg.ack();
    }
}
