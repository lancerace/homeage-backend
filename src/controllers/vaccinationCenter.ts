import express from 'express';
import VaccinationCenter from '../entities/vaccinationCenter';
import { VaccinationCenterService } from '../services';
import { DBErrorHandling } from '../utils/db';
const router: express.Router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const vaccinationCenters: VaccinationCenter[] = await VaccinationCenterService.getVaccinationCenters();
        if (!vaccinationCenters)
            return res.status(500).send({ vaccinationCenters: null, success: false })

        return res.json({ vaccinationCenters, success: true });
        
    } catch (err) {
        res.status(500).send({ success: false, message: await DBErrorHandling(err) })
    }
})

export default router;