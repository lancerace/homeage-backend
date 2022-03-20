import express from 'express';
import { getConnection } from 'typeorm';
import Booking from '../entities/booking';
import User from '../entities/user';
import { ERole } from '../interfaces';
import { IUpdateBooking } from '../interfaces/booking';
import { UserService, BookingService } from '../services';
import { DBErrorHandling } from '../utils/db';
const router: express.Router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const { fullName, nric, vaccinationcenterId, slot } = req.body;
        let user: User;
        if (!fullName || !nric || !vaccinationcenterId)
            return res.status(400).send({ message: "Full Name, NRIC or vaccinationcenterId cannot be empty" });

        //1. check if user exist
        user = await UserService.getUser(nric);
        if (!user)
            user = await UserService.addUser(fullName, nric, ERole.PATIENT);

        //2. add booking
        const booking: Booking = await BookingService.addBooking(user.userId, vaccinationcenterId, slot);

        return res.json({ booking, success: true });
    } catch (err) {
        res.status(500).send({ success: false, message: await DBErrorHandling(err), booking: null })
    }
})


router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const bookings: Booking[] = await BookingService.getBookings();

        return res.json({ bookings, success: true });
    } catch (err) {
        res.status(500).send({ success: false, message: await DBErrorHandling(err), booking: null })
    }
})

router.get('/:bookingId', async (req: express.Request, res: express.Response) => {
    try {
        const booking: Booking = await BookingService.getBooking(req.params.bookingId);

        return res.json({ booking, success: true });
    } catch (err) {
        res.status(500).send({ success: false, message: await DBErrorHandling(err), booking: null })
    }
})

router.delete('/:bookingId', async (req: express.Request, res: express.Response) => {
    try {
        const result: boolean = await BookingService.deleteBooking(req.params.bookingId);

        return res.json({ success: result, message: "booking deleted successfully" });
    } catch (err) {
        res.status(500).send({ success: false, message: await DBErrorHandling(err) })
    }
})

router.put('/:bookingId', async (req: express.Request, res: express.Response) => {
    try {
        const { userId, nric, fullName, vaccinationcenterId, slot } = req.body;

        const result: IUpdateBooking = await BookingService.updateBooking(req.params.bookingId, userId, fullName, nric, vaccinationcenterId, slot);
        return res.json({ message: result.message, success: result.success });
    } catch (err) {
        res.status(500).send({ success: false, message: await DBErrorHandling(err) })
    }
})

export default router;