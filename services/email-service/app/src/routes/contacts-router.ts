import express, { Response, Request } from "express";
import { User } from "../models/User";

const router = express.Router();

router.get('/contacts/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const userData = await User.findById(userId);

        if (!userData) {
            throw new Error('User not found');
        }

        res.send(
            userData?.contacts || []
        );
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/contacts/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { contacts } = req.body;
        const userData = await User.findById(userId);

        if (!userData) {
            throw new Error('User not found');
        }

        userData.set({
            contacts: contacts
        });

        await userData.save();

        res.send(userData);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

export { router as contactRouter };
