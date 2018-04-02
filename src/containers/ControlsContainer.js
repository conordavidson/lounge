import { connect } from 'react-redux';
import { nextMovie, previousMovie } from '../actions';
import Controls from '../components/controls';

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

const mapDispatchToProps = dispatch => {
  return {
    nextMovie: () => {
      dispatch(nextMovie())
    },
    previousMovie: () => {
      dispatch(previousMovie())
    }
  }
}

const ControlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)

export default ControlsContainer
