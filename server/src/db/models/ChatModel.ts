import {Schema, model} from 'mongoose';

import type { TChat } from '../../types';

const chat = new Schema<TChat>({
    membersList: {type: [String], default: []},
    messageListIds: {type: [String], default: []}
})


export default model<TChat>("Chat", chat);