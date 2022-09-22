import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ConnectionAttrs {
    id: string;
    userId: string;
    ip: string;
}

export interface ConnectionDoc extends mongoose.Document {
    id: string;
    userId: string;
    ip: string;
}

interface ConnectionModel extends mongoose.Model<ConnectionDoc> {
    build(attrs: ConnectionAttrs): ConnectionDoc;
    findBySessionId(sessionId: string): Promise<ConnectionDoc | null>;
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
connectionSchema.statics.build = (attrs: ConnectionAttrs) => {
    return new Connection({
        _id: attrs.id,
        userId: attrs.userId,
        ip: attrs.ip,
    });
};

const Connection = mongoose.model<ConnectionDoc, ConnectionModel>('Connection', connectionSchema);

export { Connection };
