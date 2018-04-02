import { connect } from 'react-redux';
import Player from '../components/player';

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

const PlayerContainer = connect(mapStateToProps)(Player)

export default PlayerContainer
