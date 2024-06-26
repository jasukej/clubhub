import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
    fullName: string,
    username: string,
    year: number,
    program: string,
    interests: string[],
    partOfAnyClubs: string[]
}

const initialState:OnboardingState = {
    fullName: '',
    username: '',
    year: 0,
    program: '',
    interests: [],
    partOfAnyClubs: [],
};

// createSlice function creates a slice of the Redux store
// it defines part of the store that manages onboarding data
// slice named 'onboarding'
const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    // reducers object contains function that describe how state is updated
    reducers: {
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setYear: (state, action: PayloadAction<number>) => {
            state.year = action.payload;
        },
        setProgram: (state, action: PayloadAction<string>) => {
            state.program = action.payload;
        },
        setInterests: (state, action: PayloadAction<string[]>) => {
            state.interests = action.payload;
        },
        setPartOfAnyClubs: (state, action: PayloadAction<string[]>) => {
            state.partOfAnyClubs = action.payload;
        },
    }
});

// actions can now be used in other parts of the app to update state
export const {
    setFullName,
    setUsername,
    setYear,
    setProgram,
    setInterests,
    setPartOfAnyClubs,
} = onboardingSlice.actions;

// reducer is exported to configure the Redux store
const onboardingReducer = onboardingSlice.reducer;
export default onboardingReducer;