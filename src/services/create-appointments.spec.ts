import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointments";
import { InMemoryAppointmentRepository } from "../repositories/in-memory-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointments";

describe('Create Appointment', () => {
    it('should be able to create a new Appointment', () => {
        
        const appointmentsRepository = new InMemoryAppointmentRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);

        const startsAt = getFutureDate('2022-08-10')
        const endAt = getFutureDate('2022-08-11');

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endAt
       })).resolves.toBeInstanceOf(Appointment);
    });

    it('should not be able to create a new Appointment with overlapping dates', async () => {
        
        const appointmentsRepository = new InMemoryAppointmentRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);

        const startsAt = getFutureDate('2022-08-10')
        const endAt = getFutureDate('2022-08-11');

        await createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endAt
       })
       
       expect(createAppointment.execute({
        customer: 'John Doe',
        startsAt,
        endAt
       })).rejects.toBeInstanceOf(Error)

       expect(createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2022-08-08'),
        endAt: getFutureDate('2022-08-12'),
       })).rejects.toBeInstanceOf(Error)

       expect(createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2022-08-08'),
        endAt: getFutureDate('2022-08-12'),
       })).rejects.toBeInstanceOf(Error)

       expect(createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2022-08-08'),
        endAt: getFutureDate('2022-08-17'),
       })).rejects.toBeInstanceOf(Error)

       expect(createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2022-08-11'),
        endAt: getFutureDate('2022-08-12'),
       })).rejects.toBeInstanceOf(Error)
    });
})