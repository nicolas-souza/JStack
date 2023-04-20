import PropTypes from 'prop-types';
import { Container, Footer, Overlay } from './styles';
import Button from '../Button';
import ReactPortal from '../ReactPortal';

export default function Modal({
  danger, title, children, cancelLabel, confirmLabel, onCancel, onConfirm, visible, isLoading,
}) {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button type="button" disabled={isLoading} className="cancel-button" onClick={onCancel}>
              {cancelLabel}
            </button>
            <Button type="button" danger={danger} isLoading={isLoading} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  visible: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
