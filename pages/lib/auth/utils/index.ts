import bcrypt from 'bcrypt';

export const SALT_ROUNDS = 10;

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashPassword;
};

export const decryptPassword = async (password: string, hash: string) => {
  const iscorrectPassword = await bcrypt.compare(password, hash);
  return iscorrectPassword;
};
