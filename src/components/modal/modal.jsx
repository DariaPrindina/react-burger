import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'

const modalRoot = document.getElementById('react-modals');

const Modal = ({handleClose, title, children}) => {
  useEffect(() => {
    const handleCloseByEsc = (evt) => {
      evt.key === 'Escape' && handleClose()
    }
    document.addEventListener('keydown', handleCloseByEsc)
    
    return () => {
      document.removeEventListener('keydown', handleCloseByEsc)
    }
  }, [handleClose])

  return ReactDOM.createPortal(
      <>
      <ModalOverlay handleCloseByOverlay={handleClose} />
      <div className={modalStyles.modal}>
        <div className={modalStyles.container}>
          <div className={`pl-10 pr-10 pt-10 ${modalStyles.header}`}>
            <h2 className='text text_type_main-large'>{title}</h2>
            <div className={modalStyles.closeIcon}>
              <CloseIcon type="primary" onClick={handleClose} />
            </div>
          </div>
          {children}
        </div>
      </div>
      </>,
    modalRoot
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  handleClose: PropTypes.func
}

export default Modal;