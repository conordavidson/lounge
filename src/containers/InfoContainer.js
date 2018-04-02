import { connect } from 'react-redux';
import Info from '../components/info';

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

const InfoContainer = connect(mapStateToProps)(Info)

export default InfoContainer
