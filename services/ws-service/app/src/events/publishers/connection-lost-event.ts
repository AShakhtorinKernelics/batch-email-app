import { Subjects, Publisher, ConnectionLostEvent } from '../../common/src';

export class ConnectionLostPublisher extends Publisher<ConnectionLostEvent> {
    subject: Subjects.ConnectionLost = Subjects.ConnectionLost;
}
