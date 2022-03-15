import express from 'express';
const router: express.Router = express.Router();

router.get('/vaccination-center', async (req: express.Request, res: express.Response) => {

    return res.json({ success: false, account_exist: false });
})


router.get('/vaccination-center/:id', async (req: express.Request, res: express.Response) => {

    return res.json({ success: false, account_exist: false });
})

export default router;