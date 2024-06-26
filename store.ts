import { configureStore } from '@reduxjs/toolkit'
import onboardingReducer from './onboardingSlice';

export const store = configureStore({
    reducer: {
        onboarding: onboardingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;