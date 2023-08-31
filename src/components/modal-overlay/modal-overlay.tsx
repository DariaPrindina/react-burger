import { FC } from 'react';
import overlayStyles from './modal-overlay.module.css'
import { TModalOverlay } from '../../services/types/data'


const ModalOverlay: FC<TModalOverlay> = ({handleCloseByOverlay}) => {
  return (
    <div onClick={handleCloseByOverlay} className={overlayStyles.overlay}>
    </div>
  )
}

export default ModalOverlay;