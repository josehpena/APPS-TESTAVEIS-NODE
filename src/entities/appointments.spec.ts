import { test, expect } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointments';

test('create an appointment', () => {
    const startsAt = getFutureDate('2022-08-10')
    const endAt = getFutureDate('2022-08-11');

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endAt
    });

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toEqual('John Doe');
})

test('Cannot create an appointment with end date before start date', () => {
    const startsAt = new Date();
    const endAt = new Date();

    startsAt.setDate(startsAt.getDate() + 2);
    endAt.setDate(endAt.getDate() + 1);

    expect(() =>{
        return new Appointment({
        customer: 'John Doe',
        startsAt,
        endAt
        })
    }).toThrow();

})

test('Cannot create an appointment with start before now', () => {
    const startsAt = new Date();
    const endAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1)
    endAt.setDate(endAt.getDate() + 2);

    expect(() =>{
        return new Appointment({
        customer: 'John Doe',
        startsAt,
        endAt
        })
    }).toThrow();

})