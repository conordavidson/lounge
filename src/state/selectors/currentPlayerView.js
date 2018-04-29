import { INTERMISSION, LOADING, TRAILER, HOME } from 'constants/PlayerViews'
import { createSelector } from "reselect";

export default createSelector(
  state => state.player,
  player => {
    if (player.trailerFetchDifficulty) return INTERMISSION
    if (player.loading) return LOADING
    if (player.initialized) return TRAILER
    return HOME
  }
);
