import { FileInfo } from "../FileInfo/FileInfo";
import UploadCard from "./UploadCard";
import "./UploadList.scss";
interface IProps {
  fileUploadedData: Array<FileInfo>;
  toggleUploadItem:()=>void;
}
const UploadingList = (props: IProps) => {
  const { fileUploadedData, toggleUploadItem } = props;
  return (
    <div className="uploadedList">
        <div className="head">
            <div>
                Uploading Items
            </div>
            <div>
               <button className='close' onClick={toggleUploadItem}> X</button>
            </div>
        </div>
        <div className="content">

      {fileUploadedData && fileUploadedData.length
        ? fileUploadedData.map((fileData: FileInfo) => (
            <UploadCard fileObj={fileData.fileObj}  cancel={fileData.cancel} fileData={fileData}/>
          ))
        : null}
    </div>
    </div>
  );
};

export default UploadingList;
