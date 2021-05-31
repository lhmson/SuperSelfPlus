import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    badges: {
      // list of
      type: Array,
      default: [],
    },
    newUser: {
      // define new user for guide, badge
      type: Boolean,
      default: true,
    },
    // habitsId: { type: mongoose.Schema.Types.ObjectId, ref: Habits },
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

export default User;
