import overlayStyles from './modal-overlay.module.css'
import PropTypes from 'prop-types'

const ModalOverlay = ({handleClosebyOverlay}) => {
  return (
    <div onClick={handleClosebyOverlay} className={overlayStyles.overlay}>
    </div>
  )
}

ModalOverlay.propTypes = {
  handleClosebyOverlay: PropTypes.func,
}

export default ModalOverlay;