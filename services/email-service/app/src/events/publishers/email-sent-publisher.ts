import { Subjects, Publisher, EmailSentEvent } from '../../common/src';

export class EmailSentPublisher extends Publisher<EmailSentEvent> {
    subject: Subjects.EmailSent = Subjects.EmailSent;
}
