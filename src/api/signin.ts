import axios from "@/utils/axios";

export interface SigninRecord {
  date: string;
  signed: boolean;
}

export interface SigninResult {
  success: boolean;
  points: number;
  streakDays: number;
}

// Generate mock sign-in records for a given month
// Returns records with ~60% of past days signed in, random pattern
function generateMockRecords(year: number, month: number): SigninRecord[] {
  const records: SigninRecord[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const date = new Date(year, month - 1, day);
    // Don't include future dates
    if (isCurrentMonth && date > today) continue;
    // ~60% chance of signed in for past dates
    records.push({
      date: dateStr,
      signed: Math.random() > 0.4,
    });
  }
  return records;
}

// Mock: get sign-in records for a month
export const getSigninRecords = (year: number, month: number): Promise<SigninRecord[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockRecords(year, month));
    }, 300);
  });
};

// Mock: perform daily sign-in
export const doSignin = (): Promise<SigninResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, points: 1, streakDays: 1 });
    }, 300);
  });
};

// Mock: perform makeup sign-in
export const doMakeup = (date: string): Promise<SigninResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, points: 1, streakDays: 1 });
    }, 300);
  });
};

// Mock: get user sign-in info (makeup cards, points)
export const getSigninInfo = (): Promise<{ makeupCards: number; points: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ makeupCards: 3, points: 0 });
    }, 300);
  });
};
