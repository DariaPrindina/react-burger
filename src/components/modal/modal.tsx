import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom'
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { TModal } from '../../services/types/data'; 

const modalRoot = document.getElementById('react-modals') as Element

const Modal: FC<TModal> = ({handleClose, title, children}) => {
  useEffect(() => {
    const handleCloseByEsc = (evt: {key: string}): void => {
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
            {title 
              ? <div className={`${modalStyles.header} mt-10`}>
                  <h2 className={`text text_type_main-large ${modalStyles.title}`}>{title}</h2>
                  <div className={modalStyles.closeIconHeader}>
                    <CloseIcon type="primary" onClick={handleClose} />
                  </div>
                </div>
              : <div className={modalStyles.closeIcon}>
                  <CloseIcon type="primary" onClick={handleClose} />
                </div>
            }
          {children}
        </div>
      </div>
      </>,
    modalRoot
  )
}

export default Modal;