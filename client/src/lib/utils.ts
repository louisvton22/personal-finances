import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export class Date {
  private day: string;
  month: string;
  year: string;
  
  constructor(datetime: string) {
    let times = datetime.split("-")
    this.day = times[2];
    this.month = Month[parseInt(times[1])];
    this.year = times[0]
  }
}

export enum Month {
  January = 1,
  Febraury = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12
}


