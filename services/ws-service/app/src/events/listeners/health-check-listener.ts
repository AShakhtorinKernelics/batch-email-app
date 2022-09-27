import { Message } from "node-nats-streaming";
import { Listener, HealthCheckEvent, Subjects } from "../../common/src";

export class HealthCheckListener extends Listener<HealthCheckEvent> {
    subject: Subjects.HealthCheck = Subjects.HealthCheck;
    queueGroupName = 'qwe-service';

    onMessage(data: HealthCheckEvent['data'], msg: Message) {
        console.log('Service is Alive!', data);
        msg.ack();
    }
}
