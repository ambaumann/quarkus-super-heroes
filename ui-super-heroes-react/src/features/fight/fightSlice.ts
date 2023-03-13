import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { fightsApi, Hero, Villain } from  '../../app/api/fightsApi';
//import { fetchCount } from './counterAPI';

export interface FightsState {
  winner?: Hero | Villain
  hero?: Hero;
  villain?: Villain
}

const initialState: FightsState = {
};

export const fightsSlice = createSlice({
  name: 'fights',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    heroWins: (state) => {
      state.winner = state.hero;
    },
    villainWins: (state) => {
      state.winner = state.villain;
    },
    newFight: (state) => {
      state.winner = undefined;
      state.hero = undefined;
      state.villain = undefined;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // TODO make sure this isnt swallowing the action elsewhere.
      .addMatcher(fightsApi.endpoints.getApiFightsRandomfighters.matchFulfilled, (state, { payload }) => {
        state.hero = payload.hero;
        state.villain = payload.villain;
        state.winner = undefined;
      });
  },
});

export const { heroWins, villainWins, newFight } = fightsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectHero = (state: RootState) => state.fights.hero;
export const selectVillain = (state: RootState) => state.fights.villain;
export const selectWinnerName = (state: RootState) => state.fights.winner?.name;

export default fightsSlice.reducer;