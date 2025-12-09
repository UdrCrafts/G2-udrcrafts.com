import { appRouter } from "./routers/_app";

export const caller = appRouter.createCaller(createTRPCContex);