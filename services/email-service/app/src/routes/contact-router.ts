import express, { Response, Request } from "express";
import { ContactList } from "../models/ContactList";
import { passportJWTCheckOptions } from "../utils";

const router = express.Router();

router.use('/contacts', passportJWTCheckOptions);

router.get('/contacts',

    async (req: Request, res: Response) => {
        try {
            const userId = req.params.id; // get from token
            const contactsData = await ContactList.findOne({ userId });

            console.log('contacts');
            console.log(contactsData);

            /* if (!userData) {
                throw new Error('User not found');
            } */

            res.send(contactsData);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });

router.post('/contacts', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id; // get from token
        const { contacts } = req.body;
        const contactData = await ContactList.findOne({ userId });

        /* if (!userData) {
            throw new Error('User not found');
        } */

        if (!contactData) {
            throw new Error('No list found');
        }

        contactData.set({
            contacts
        });

        await contactData.save();

        res.send(contactData);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

export { router as contactRouter };
