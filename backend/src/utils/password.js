import bcrypt from "bcryptjs";

export const encriptarPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const compararPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
