import {createTRPRouter} from '../init';
import { authRouter } from '@/modules/auth/server/procedures';
import {categoriesRouter} from '@/modules/categories/server/procedures' ;

export const appRouter = createTRPRouter({
    auth : authRouter,
    categories: categoriesRouter
});

export type AppRouter = typeof appRouter ;
