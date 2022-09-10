import { areIntervalsOverlapping } from "date-fns";

import { Appointment } from "../entities/appointments";
import { AppointmentRepository } from "./appointments-repository";

export class InMemoryAppointmentRepository implements AppointmentRepository {
    public items: Appointment[] = [];

    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment);
    }

    async findOverlappingAppointments(startsAt: Date, endAt: Date): Promise<Appointment | null> {
        const overlappingAppointmnet = this.items.find(appointment =>{
            return areIntervalsOverlapping(
                { start: startsAt, end: endAt },
                { start: appointment.startsAt, end: appointment.endAt},
                { inclusive: true}
            )
        })

        if(!overlappingAppointmnet)
            return null
        
        return overlappingAppointmnet
    }
}
    
