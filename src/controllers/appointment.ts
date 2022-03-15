import express from 'express';
const router: express.Router = express.Router();


interface IBookAppointment {
    name: string;
    vaccinationCenterId: number;
    time: Date;
}
router.post('/bookAppointment', async (req: express.Request, res: express.Response) => {
    const body: IBookAppointment = req.body;
    return res.json({ success: false, account_exist: false });
})





export default router;