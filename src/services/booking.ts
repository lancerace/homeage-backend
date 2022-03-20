import { DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";
import { BookingService, UserService } from "../services";
import { UPDATED_SUCCESS_MESSAGE } from "../constants/db";
import Booking from "../entities/booking";
import User from "../entities/user";
import { IUpdateBooking } from "../interfaces/booking";
import { DBErrorHandling } from '../utils/db';


async function addBooking(userId: number, vaccinationcenterId: number, startTime: Date): Promise<Booking> {
    try {
        const booking: Booking = await getRepository(Booking).save({
            userId,
            vaccinationcenterId,
            startTime
        });
        return booking;
    } catch (err) {
        await DBErrorHandling(err);
    }
}

async function updateBooking(bookingId: number, userId: number, fullName: string, nric: string, vaccinationcenterId: number, startTime: Date): Promise<IUpdateBooking> {
    let updateUser: UpdateResult, updateBooking: UpdateResult;

    //0. guard condition check booking exists
    const booking: Booking = await BookingService.getBooking(bookingId);
    if (!booking)
        return { message: "booking Id does not exist", success: false };

    //1. update user details
    updateUser = await UserService.updateUser(userId, fullName, nric);

    //2. update booking details
    updateBooking = await getConnection().createQueryBuilder().update(Booking)
        .set({ userId, vaccinationcenterId, startTime }).where("bookingId = :bookingId", { bookingId })
        .returning(['*'])
        .execute();

    return { success: (updateUser.affected > 0 && updateBooking.affected > 0) ? true : false, message: UPDATED_SUCCESS_MESSAGE }
}


async function getBookings():Promise<Booking[]>{
    return getRepository(Booking).createQueryBuilder('booking')
    .select(['booking.bookingId','booking.startTime','user.userId','user.fullName','vaccinationcenter.vaccinationcenterId'
    ,'vaccinationcenter.name',])
    .leftJoin('booking.user','user')
    .leftJoin('booking.vaccinationcenter','vaccinationcenter')
    .orderBy('booking.bookingId','ASC').getMany();
}


async function getBooking(bookingId: number): Promise<Booking> {
    const query = getRepository(Booking).createQueryBuilder('booking')
        .select(["booking.bookingId",'booking.startTime','user.userId','user.fullName','user.nric','booking.vaccinationcenterId'])
        .leftJoin('booking.user','user')
        .where('booking.bookingId = :bookingId', { bookingId })

    return await query.getOne();
}

async function deleteBooking(bookingId: number): Promise<boolean> {
    const result: DeleteResult = await getRepository(Booking).createQueryBuilder('booking')
        .softDelete().where('bookingId = :bookingId', { bookingId })
        .execute();
    return result.affected > 0 ? true : false;

}

export default { addBooking, getBookings, deleteBooking, updateBooking, getBooking };