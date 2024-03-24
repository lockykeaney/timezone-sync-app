import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcrypt";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const hashPassword = async (password: string): Promise<string> => {
//   return bcrypt.hash(password, 10);
// };

// export const comparePasswords = async (
//   plainPassword: string,
//   hashedPassword: string,
// ): Promise<boolean> => {
//   const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
//   return isMatch;
// };
