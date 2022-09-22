import { Subjects } from "./subjects";

export interface EmailSentEvent {

    subject: Subjects.EmailSent;
    data: {
        success: boolean,
        batchSize: number,
        batchId?: number
    };
}
