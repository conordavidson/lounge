import { createSelector } from "reselect";

export default createSelector(
  state => state.player,
  player => player.queue.indexOf(player.currentMovieId) === 0
);
