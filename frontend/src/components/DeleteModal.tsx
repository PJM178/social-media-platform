interface DeleteModalProps {
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  handleDeletePost: () => void
}

const DeleteModal = ({ setOpenDeleteModal, handleDeletePost }: DeleteModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content-inside">
          <span className="close">&times;</span>
          <p>Are you sure you want to delete the post?</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div onClick={handleDeletePost} className="delete-modal-button"><div>Delete</div></div>
            <div onClick={() => setOpenDeleteModal(false)} className="delete-modal-button"><div>Cancel</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;