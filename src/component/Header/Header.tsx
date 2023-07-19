import "./Header.scss";
import Loader from "./Loader";
import UploadDropdown from "./UploadDropdown";
interface IProps {
  fileUploadHandler: (event: any) => void;
  isUploaded: boolean;
  showUploadedItems: () => void;
}
const Header = (props: IProps) => {
  const { fileUploadHandler, isUploaded, showUploadedItems } = props;
  return (
    <div className="container">
      <div>
        <UploadDropdown fileUploadHandler={fileUploadHandler} />
      </div>
      {!isUploaded && (
        <div className="uploading">
          <button onClick={showUploadedItems}>
            <Loader /> <div className="text">Uploaded Items</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
