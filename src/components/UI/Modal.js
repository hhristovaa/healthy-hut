import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const portalEl = document.getElementById('overlays');

const Backdrop = props => {
    return (
        <section className={classes.backdrop} onClick={props.onClose}>
        </section>
    )
};

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const Modal = props => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalEl)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEl)}
        </>
    )
};

export default Modal;