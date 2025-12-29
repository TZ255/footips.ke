import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uid: { type: String, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    isPaid: { type: Boolean, default: false },
    payment: {
      paidOn: { type: Date },
      expiresAt: { type: Date },
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    resetCode: { type: String },
    resetExpires: { type: Date },
  },
  { timestamps: true }
);

const authDb = mongoose.connection.useDb('mikeka-ya-uhakika');
const User = authDb.model('kenya-user', userSchema);

export default User;
