import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ConnectionAttrs {
    id: string;
    userId: string;
    ip: string;
    ws: any;
}

export interface ConnectionDoc extends mongoose.Document {
    id: string;
    userId: string;
    ip: string;
    ws: any;
}

interface ConnectionModel extends mongoose.Model<ConnectionDoc> {
    build(attrs: ConnectionAttrs): ConnectionDoc;
    findBySessionId(sessionId: string): Promise<ConnectionDoc | null>;
    findByUserId(userId: string): Promise<ConnectionDoc | null>;
}

const connectionSchema = new mongoose.Schema(
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

connectionSchema.set('versionKey', 'version');
connectionSchema.plugin(updateIfCurrentPlugin);

connectionSchema.statics.findBySessionId = (
    sessionId: string
) => {
    return Connection.findOne({
        id: sessionId
    });
};

connectionSchema.statics.findByUserId = (
    userId: string
) => {
    return Connection.findOne({
        userId: userId
    });
};

connectionSchema.statics.build = (attrs: ConnectionAttrs) => {
    return new Connection({
        _id: attrs.id,
        userId: attrs.userId,
        ip: attrs.ip,
        ws: attrs.ws
    });
};



const Connection = mongoose.model<ConnectionDoc, ConnectionModel>('Connection', connectionSchema);

export { Connection };
