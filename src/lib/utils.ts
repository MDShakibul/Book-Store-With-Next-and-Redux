import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const certificateDate = (date: Date) => {
  const today = new Date(date);
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return today.getDate()  + ' ' + month[today.getMonth()]+ ', ' + today.getFullYear();
};

export const calenderDate = (date: Date) => {
  const originalDate = new Date(date);

const year = originalDate.getUTCFullYear();
const month = String(originalDate.getUTCMonth() + 1).padStart(2, '0');
const day = String(originalDate.getUTCDate()).padStart(2, '0');

return`${year}-${month}-${day}`;
}

