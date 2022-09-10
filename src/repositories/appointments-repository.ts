import { Appointment } from "../entities/appointments";

export interface AppointmentRepository {
    create(appointment: Appointment): Promise<void>;
    findOverlappingAppointments(startsAt: Date, endAt: Date): Promise<Appointment | null>;
}