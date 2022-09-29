import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface EmailAttrs {
    userId: string;
    ip: string;
    ws: any;
}

export interface EmailDoc extends mongoose.Document {
    id: string;
    userId: string;
    ip: string;
    ws: any;
}

interface EmailModel extends mongoose.Model<EmailDoc> {
    build(attrs: EmailAttrs): EmailDoc;
    findBySessionId(sessionId: string): Promise<EmailDoc | null>;
    findByUserId(userId: string): Promise<EmailDoc | null>;
}

const emailSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        ip: {
            type: String,
            required: true,
        },
        ws: {
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

emailSchema.set('versionKey', 'version');
emailSchema.plugin(updateIfCurrentPlugin);

emailSchema.statics.findBySessionId = (
    sessionId: string
) => {
    return Connection.findOne({
        id: sessionId
    });
};

emailSchema.statics.findByUserId = (
    userId: string
) => {
    return Connection.findOne({
        userId: userId
    });
};

emailSchema.statics.build = (attrs: EmailAttrs) => {
    return new Connection({
        _id: attrs.id,
        userId: attrs.userId,
        ip: attrs.ip,
        ws: attrs.ws
    });
};



const Connection = mongoose.model<ConnectionDoc, ConnectionModel>('Connection', connectionSchema);

export { Connection };
