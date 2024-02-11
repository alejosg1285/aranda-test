import { useStore } from "../../app/stores/store";

export interface Props {
  handleConfirm: () => void;
}

const ModalConfirmation = ({ handleConfirm }: Props) => {
  const { commonStore: { closeModal }} = useStore();

  return (
    <div id="exampleModalLive" style={{display: 'block'}} className="modal show" aria-modal="true" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Confirmación</h1>
            <button type="button" className="btn-close" onClick={() => closeModal()} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>¿Está seguro que desea continuar?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => closeModal()}>Close</button>
            <button type="button" className="btn btn-primary" onClick={() => handleConfirm()}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmation;
