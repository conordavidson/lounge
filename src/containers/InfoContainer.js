import { connect } from 'react-redux'
import Info from '../components/Info'

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

export default connect(mapStateToProps)(Info)
