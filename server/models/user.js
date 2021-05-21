import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    // id: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

export default User;
