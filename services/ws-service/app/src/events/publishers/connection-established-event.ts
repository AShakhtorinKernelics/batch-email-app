import { Subjects, Publisher, ConnectionEstablishedEvent } from '../../common/src';

export class ConnectionEstablishedPublisher extends Publisher<ConnectionEstablishedEvent> {
    subject: Subjects.ConnectionEstablished = Subjects.ConnectionEstablished;
}
