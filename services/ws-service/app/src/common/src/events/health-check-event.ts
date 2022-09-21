import { Subjects } from "./subjects";

export interface HealthCheckEvent {

    subject: Subjects.HealthCheck;
    data: {
        alive: true
    };
}
