import { Schema, model } from "mongoose";

import type { TChatList } from "../../types";


const chatList = new Schema<TChatList>({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    chatIds: {type: [String], default: []},
    pinnedChatIds: {type: [String], default: []}
})


export default model<TChatList>("ChatList", chatList);