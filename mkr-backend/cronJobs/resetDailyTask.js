import cron from "node-cron";
import { DailyTask } from "../models/dailyTask.js";

export const setupResetCronJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const result = await DailyTask.updateMany(
        { isCompleted: true },
        { $set: { isCompleted: false, statusUpdatedAt: new Date() } }
      );
      console.log(`Reset daily tasks: ${result.modifiedCount} tasks updated.`);
    } catch (error) {
      console.error("Error resetting daily task statuses:", error);
    }
  });

  console.log("Cron job for resetting daily tasks scheduled.");
};
