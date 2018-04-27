import { connect } from 'react-redux'
import Info from '../components/info'

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

export default connect(mapStateToProps)(Info)
