import { connect } from 'react-redux'
import Player from '../components/Player'

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

export default connect(mapStateToProps)(Player)
