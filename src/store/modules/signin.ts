import { defineStore } from "pinia";
import { ref, computed } from "vue";
import dayjs from "dayjs";
import {
  getSigninRecords,
  doSignin as apiDoSignin,
  doMakeup as apiDoMakeup,
  getSigninInfo,
  type SigninRecord,
} from "@/api/signin";

const useSigninStore = defineStore(
  "signin",
  () => {
    // State
    const records = ref<Map<string, boolean>>(new Map());
    const streakDays = ref<number>(0);
    const makeupCards = ref<number>(3);
    const points = ref<number>(0);
    const lastSigninDate = ref<string | null>(null);
    const loading = ref<boolean>(false);

    // Computed
    const currentMonthRecords = computed(() => {
      const now = dayjs();
      const daysInMonth = now.daysInMonth();
      const result: { date: string; signed: boolean; day: number }[] = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = now.format(`YYYY-MM-${String(day).padStart(2, "0")}`);
        result.push({
          date: dateStr,
          signed: records.value.get(dateStr) ?? false,
          day,
        });
      }
      return result;
    });

    const isTodaySigned = computed(() => {
      const today = dayjs().format("YYYY-MM-DD");
      return records.value.get(today) ?? false;
    });

    // Actions
    const fetchRecords = async (year: number, month: number) => {
      loading.value = true;
      try {
        const data = await getSigninRecords(year, month);
        const newMap = new Map<string, boolean>();
        data.forEach((r: SigninRecord) => {
          newMap.set(r.date, r.signed);
        });
        records.value = newMap;
        calculateStreak();
      } finally {
        loading.value = false;
      }
    };

    const fetchInfo = async () => {
      const info = await getSigninInfo();
      makeupCards.value = info.makeupCards;
      points.value = info.points;
    };

    const calculateStreak = () => {
      let count = 0;
      let date = dayjs();
      // If today is not signed, start from yesterday
      if (!records.value.get(date.format("YYYY-MM-DD"))) {
        date = date.subtract(1, "day");
      }
      while (records.value.get(date.format("YYYY-MM-DD"))) {
        count++;
        date = date.subtract(1, "day");
      }
      streakDays.value = count;
    };

    const calculatePoints = (streak: number, isMakeup: boolean): number => {
      if (isMakeup) return 1;
      let pts = 1;
      if (streak >= 30) pts += 30;
      else if (streak >= 7) pts += 7;
      return pts;
    };

    const doSignin = async () => {
      const today = dayjs().format("YYYY-MM-DD");
      if (records.value.get(today)) return { success: false, points: 0, streakDays: streakDays.value };

      loading.value = true;
      try {
        const result = await apiDoSignin();
        records.value.set(today, true);
        lastSigninDate.value = today;
        calculateStreak();
        const earnedPoints = calculatePoints(streakDays.value, false);
        points.value += earnedPoints;
        return { ...result, points: earnedPoints, streakDays: streakDays.value };
      } finally {
        loading.value = false;
      }
    };

    const doMakeup = async (date: string) => {
      if (makeupCards.value <= 0) throw new Error("No makeup cards available");
      const makeupDate = dayjs(date);
      const today = dayjs().endOf("day");
      const sevenDaysAgo = dayjs().subtract(7, "day").startOf("day");

      if (makeupDate.isAfter(today) || makeupDate.isBefore(sevenDaysAgo)) {
        throw new Error("Date out of makeup range");
      }
      if (records.value.get(date)) throw new Error("Already signed on this date");

      loading.value = true;
      try {
        await apiDoMakeup(date);
        records.value.set(date, true);
        makeupCards.value -= 1;
        calculateStreak();
        const earnedPoints = calculatePoints(0, true);
        points.value += earnedPoints;
        return { success: true, points: earnedPoints, streakDays: streakDays.value };
      } finally {
        loading.value = false;
      }
    };

    return {
      records,
      streakDays,
      makeupCards,
      points,
      lastSigninDate,
      loading,
      currentMonthRecords,
      isTodaySigned,
      fetchRecords,
      fetchInfo,
      doSignin,
      doMakeup,
      calculateStreak,
    };
  },
  {
    persist: true,
  },
);

export default useSigninStore;
