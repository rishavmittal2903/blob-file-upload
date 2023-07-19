import { FcDocument } from "react-icons/fc";
import { IFileUpload } from "../../interfaces/IFileUpload";
import { getSeconds } from "../../utility/utility";
import { FileInfo } from "../FileInfo/FileInfo";
interface IProps{
  fileObj:IFileUpload,
  cancel:(control:any, fileObj:IFileUpload)=>void;
  fileData:FileInfo;
}
const UploadCard = (props: IProps) => {
  const {cancel, fileObj:{initialTime,
    finalTime,
    isFailed,
    isCanceled,
    isUploaded,
    fileName,
    progress},fileData}= props;

  return (
    <div className="card">
      <div className="cardIcon">
        <FcDocument className='icon'/>
      </div>
      <div className="fileConatiner">
        <div className="fileName">{fileName}</div>
        {!isUploaded && !isFailed && !isCanceled && <div className="progress">
          <div className="title">Uploading In-Progress:</div>
          <div className="progressBar">
          <progress id="file" value={progress} max="100" className="mark">
          </progress>
          <div>{progress}%</div>
          <div className="cancelUpload">
               <button className='close' onClick={()=>cancel(fileData.controller, fileData.fileObj)}> X</button>
            </div>
          </div>
        </div>}
        {isUploaded && !isFailed && !isCanceled  && (
          <div className="completed">
            Uploaded in {getSeconds(initialTime, finalTime)}
          </div>
        )}
        {isCanceled && !isUploaded && !isFailed && <div className="cancelled">Uploading cancelled!!</div>}
        {!isCanceled && !isUploaded && isFailed &&  <div className="failed">Uploading Failed!!</div>}
      </div>
    </div>
  );
};

export default UploadCard;
