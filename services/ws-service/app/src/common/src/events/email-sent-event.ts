import { Subjects } from "./subjects";

export interface EmailSentEvent {

    subject: Subjects.EmailSent;
    data: {
        success: boolean,
        usedId: string,
        batchSize: number,
        batchId?: number
    };
}
