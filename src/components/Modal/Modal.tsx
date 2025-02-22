import './Modal.css';

interface ModalProps {
  message: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-message">{message}</div>
        <button className="modal-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}; 