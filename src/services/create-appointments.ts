import { Appointment } from "../entities/appointments";
import { AppointmentRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest{
    customer: string,
    startsAt: Date,
    endAt: Date,
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
    constructor(
        private appointmentsRepository: AppointmentRepository
    ){}


    async execute({customer, startsAt, endAt}: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        const overlappingAppointmnet = await this.appointmentsRepository.findOverlappingAppointments(
            startsAt,
            endAt
        )

        if (overlappingAppointmnet){
            throw new Error("Another Appointment overlaps this appointment dates");
        }

        const appointment = new Appointment({
            customer,
            startsAt,
            endAt
        });

        await this.appointmentsRepository.create(appointment);

        return appointment;
    }


}