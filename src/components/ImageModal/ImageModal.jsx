import css from "./ImageModal.module.css";
import Modal from "react-modal";
Modal.setAppElement("#root");
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8) ",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function ImageModal({ modalImage, openModal, closeModal }) {
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img className={css.image} src={modalImage} alt={""} width={"900px"} />
    </Modal>
  );
}
