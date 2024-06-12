import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UsuarioSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    pass: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
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

UsuarioSchema.pre("save", async function (next) {
  // Si no está modificado el password, que no haga nada
  if (!this.isModified("pass")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.pass = await bcrypt.hash(this.pass, salt);
});

/* UsuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.pass);
}; */

export const Usuario = models.Usuario || model("Usuario", UsuarioSchema);
