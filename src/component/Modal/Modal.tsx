import "./Modal.scss";

interface IProps {
  bodyContent: any;
  isActionRequired: boolean;
  onConfirmHandler: () => void;
  onCancelHandler: () => void;
  confirmText: string;
  cancelText: string;
}
const Modal = (props: IProps) => {
  const {
    bodyContent,
    isActionRequired,
    onConfirmHandler,
    onCancelHandler,
    confirmText,
    cancelText,
  } = props;
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="header">
          <div className="closeBtn" role="button" onClick={onCancelHandler}>
            &times;
          </div>
        </div>
        <div className="content">
          <p>{bodyContent}</p>
        </div>
        {isActionRequired && (
          <div className="footer">
            <button onClick={onCancelHandler}>{cancelText}</button>
            <button onClick={onConfirmHandler} className='primary'>{confirmText}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
