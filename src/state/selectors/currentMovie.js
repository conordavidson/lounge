import { createSelector } from "reselect";

export default createSelector(
  state => state.player,
  player => player.movies[player.currentMovieId]
);
