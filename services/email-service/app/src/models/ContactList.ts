import mongoose from 'mongoose';

interface ContactListAttrs {
    userId: string;
    contacts: string[];
}

export interface ContactListDoc extends mongoose.Document {
    userId: string;
    contacts: string[];
}

interface ContactListModel extends mongoose.Model<ContactListDoc> {
    build(attrs: ContactListAttrs): ContactListDoc;
}

const ContactListSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        contacts: {
            type: Array,
            required: true,
        },
    }
);

ContactListSchema.statics.build = (attrs: ContactListAttrs) => {
    return new ContactList(attrs);
};

const ContactList = mongoose.model<ContactListDoc, ContactListModel>('ContactList', ContactListSchema);

export { ContactList };
