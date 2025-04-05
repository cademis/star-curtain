import { router } from "../trpc.js";

import { userRouter } from "./user.router.js";
import { apparatusRouter } from "./apparatus.router.js";
import { activityRouter } from "./activity.router.js";

export const appRouter = router({
  user: userRouter,
  apparatus: apparatusRouter,
  activity: activityRouter,
});
