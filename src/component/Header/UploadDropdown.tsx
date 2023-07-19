import { useEffect } from "react";
import { FcUpload } from "react-icons/fc";
import { PiCaretDownBold } from "react-icons/pi";
interface IProps {
  fileUploadHandler: (files: Array<any>) => void;
}
const UploadDropdown = (props: IProps) => {
  const { fileUploadHandler } = props;
  useEffect(() => {
    const actualBtn: any = document.getElementById("actual-btn");
    actualBtn.addEventListener("change", fileUploadHandler);
     // eslint-disable-next-line
  }, []);
  return (
    <div className="dropdown">
      <button className="dropbtn">
        <div className='uploadIcon'>
          <FcUpload />
        </div>
        <div> Upload</div>
        <div className='caret'>
          <PiCaretDownBold />
        </div>
      </button>
      <div className="dropdown-content">
        <input type="file" id="actual-btn" hidden multiple/>
        <label htmlFor="actual-btn">Files</label>
      </div>
    </div>
  );
};

export default UploadDropdown;
