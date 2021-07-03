import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  userId: {
    type: String,
  },
  roomId: {
    type: String,
  },
  seen: {
    type: Boolean,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
