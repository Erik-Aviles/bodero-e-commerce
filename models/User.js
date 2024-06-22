import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    avatar: [{ type: String }],
    role: {
      type: String,
      default: "user",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* UserSchema.pre("save", async function (next) {
  // Si no está modificado el password, que no haga nada
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.pass);
}; 
 */
export const User = models.User || model("User", UserSchema);
