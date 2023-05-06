import overlayStyles from './modal-overlay.module.css'
import PropTypes from 'prop-types'

const ModalOverlay = ({handleCloseByOverlay}) => {
  return (
    <div onClick={handleCloseByOverlay} className={overlayStyles.overlay}>
    </div>
  )
}

ModalOverlay.propTypes = {
  handleCloseByOverlay: PropTypes.func,
}

export default ModalOverlay;