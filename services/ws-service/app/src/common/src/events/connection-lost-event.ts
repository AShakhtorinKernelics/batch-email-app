import { Subjects } from "./subjects";

export interface ConnectionLostEvent {

    subject: Subjects.ConnectionLost;
    data: {
        userId: string,
        sessionId: string
    };
}
