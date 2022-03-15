import express from 'express';
const router: express.Router = express.Router();

router.post('/nurses-available', async (req: express.Request, res: express.Response) => {

    return res.json({ success: false, account_exist: false });
})





export default router;