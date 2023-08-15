import { useEffect, useState } from "react";
import { IFileUpload } from "../../interfaces/IFileUpload";
import {
  getBlobsInContainer,
  isFileExists,
  isFilesUploadingCompleted,
} from "../../utility/utility";
import DocumentList from "../DocumentList/DocumentList";
import { FileInfo } from "../FileInfo/FileInfo";
import Header from "../Header/Header";
import { v4 as uuidv4 } from "uuid";
import "./Layout.scss";
import UploadingList from "../UploadingList/UploadingList";
import { fileTableColumns } from "../../constants/AppContants";
import { IFileTable } from "../../interfaces/IFileTable";
import Modal from "../Modal/Modal";
import DragDropComponent from "../DragDropComponent/DragDropComponent";
let blobFileData:Array<any>=[];
interface IProps{
  sasToken:string
}
const Layout = (props:IProps) => {
  const {sasToken}= props;
  const [documentList, setDocumentList] = useState<IFileTable>({
    rows: [],
    columns: fileTableColumns,
  });
  const [fileData, setFileData] = useState<Array<FileInfo>>([]);
  const [uploadedData, setUploadedData] = useState<Array<IFileUpload>>([]);
  const [showModal, toggleModal] = useState<boolean>(false);
  const [fileArrayData,setFileArrayData]= useState<Array<string>>([]);
  const [isVisible, toggleUploadItems] = useState<boolean>(false);
  const [filesData, setFilesData] = useState<Array<any>>([]);
  const getDocumentList = async () => {
    const data = await getBlobsInContainer(sasToken);
    blobFileData= data;
    setDocumentList((prev) => ({ ...prev, rows: data }));
  };
  useEffect(() => {
    getDocumentList();
    // eslint-disable-next-line
  }, []);

  const updateFileData = (fileObj: IFileUpload) => {
    const fileObjData: Array<IFileUpload> = Object.assign([], uploadedData);
    const index = uploadedData.findIndex(
      (f: IFileUpload) => f.fileId === fileObj.fileId
    );
    if (index !== -1) {
      fileObjData[0] = { ...fileObj };
    }
    setUploadedData([...fileObjData]);
  };

  const uploadFileDataToBlob=(files:any)=>{
    const fileArray: Array<FileInfo> = [];
      for (let file of files) {
        const fileObj: IFileUpload = {
          fileId: uuidv4(),
          fileName: file?.name,
          isUploaded: false,
          progress: 0,
          isCanceled: false,
          file: file,
          getDocumentList: getDocumentList,
          updateData: updateFileData,
        };
        fileArray.push(new FileInfo(file, fileObj, sasToken));
      }
      setFileData((prev: any) => [...prev, ...fileArray]);
      for (let data of fileArray) {
        data.upload(sasToken);
      }
  }
  const fileUploadHandler = (event: any) => {
    const files = event?.length ? event : event?.target.files;
    setFilesData(files);
    const fileExists:Array<string>= isFileExists(blobFileData, files);
    if(!fileExists?.length)
    {
      uploadFileDataToBlob(files);
  }
    else
    {
      setFileArrayData(fileExists);
      toggleModal(true);
    }

    
  };
  const showUploadedItems = () => {
    toggleUploadItems((prev) => !prev);
  };
  const confirmHandler = () => {
    uploadFileDataToBlob(filesData);
    toggleModal((prev) => !prev);
    setFileArrayData([]);
  };
  const cancelHandler = () => {
    toggleModal((prev) => !prev);
  };
  return (
    <DragDropComponent handleFiles={fileUploadHandler}>

    <div className="main">
      <Header
        fileUploadHandler={fileUploadHandler}
        isUploaded={showModal || isFilesUploadingCompleted(fileData)}
        showUploadedItems={showUploadedItems}
      />
      <DocumentList documentList={documentList}/>
      {isVisible && !showModal && (
        <UploadingList
          fileUploadedData={fileData}
          toggleUploadItem={showUploadedItems}
        />
      )}
      {showModal && (
        <Modal
          bodyContent={`Files(${fileArrayData?.join(',')}) are already exists. Do you want to override?`}
          isActionRequired
          onConfirmHandler={()=>confirmHandler()}
          onCancelHandler={()=>cancelHandler()}
          confirmText="Confirm"
          cancelText="Cancel"
        />
      )}
    </div>
    </DragDropComponent>
  );
};

export default Layout;
