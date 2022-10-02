import mongoose from 'mongoose';
import { toEncrypted } from '../utils';

interface UserAttrs {
    displayName: string;
    googleId: string;
    refreshToken: string;
    userEmail: string;
    contacts: string[];
    userWsConnectionId: any;
}

export interface UserDoc extends mongoose.Document {
    displayName: string;
    googleId: string;
    refreshToken: string;
    userEmail: string;
    contacts: string[];
    userWsConnectionId: any;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
        },
        googleId: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        },
        userEmail: {
            type: String,
            required: true,
        },
        contacts: {
            type: Array,
            required: true,
        },
        userWsConnectionId: {
            type: String,
            required: true,
        },
    }
);

userSchema.statics.build = (attrs: UserAttrs) => {
    const tempAttrs = { ...attrs };
    tempAttrs.refreshToken = toEncrypted(tempAttrs.refreshToken, tempAttrs.userEmail);
    return new User({
        ...tempAttrs
    });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
