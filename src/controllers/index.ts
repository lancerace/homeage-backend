import express from "express";
import VaccinationController from './vaccinationCenter';
import NurseController from './nurse';

import BookingController from './booking';
const router: express.Router = express.Router();

router.use("/vaccination-centers", VaccinationController);
router.use("/nurse", NurseController);
router.use("/bookings", BookingController);

export default router;
