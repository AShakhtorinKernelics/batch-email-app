import { Subjects } from "./subjects";

export interface ConnectionEstablishedEvent {

    subject: Subjects.ConnectionEstablished;
    data: {
        userId: string,
        sessionId: string
    };
}
