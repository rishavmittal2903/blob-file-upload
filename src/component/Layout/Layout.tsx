import { useEffect, useState } from "react";
import { IFileUpload } from "../../interfaces/IFileUpload";
import { getBlobsInContainer, isFilesUploadingCompleted } from "../../utility/utility";
import DocumentList from "../DocumentList/DocumentList";
import { FileInfo } from "../FileInfo/FileInfo";
import Header from "../Header/Header";
import { v4 as uuidv4 } from 'uuid';
import "./Layout.scss";
import UploadingList from "../UploadingList/UploadingList";
import { fileTableColumns } from "../../constants/AppContants";
import { IFileTable } from "../../interfaces/IFileTable";
const Layout = () => {
  const [documentList, setDocumentList] = useState<IFileTable>({rows:[], columns:fileTableColumns});
  const [fileData, setFileData] = useState<Array<any>>([]);
  const [uploadedData, setUploadedData]= useState<Array<IFileUpload>>([]);
  const [isVisible, toggleUploadItems]= useState<boolean>(false);
  const getDocumentList = async () => {
    const data = await getBlobsInContainer();    
    setDocumentList((prev)=>({...prev, rows:data}));
  };
  useEffect(() => {
    getDocumentList();
    // eslint-disable-next-line
  }, []);

  const updateFileData=(fileObj:IFileUpload)=>{
  const fileObjData:Array<IFileUpload>= Object.assign([],uploadedData);
  const index = uploadedData.findIndex((f:IFileUpload)=>f.fileId===fileObj.fileId);
  if(index!==-1)
  {
    fileObjData[0]={...fileObj};
  }
  setUploadedData([...fileObjData]);
  }
  const fileUploadHandler = (event: any) => {
    const files = event?.target.files;
    const fileArray: Array<FileInfo> = [];
    for (let file of files) {

      const fileObj:IFileUpload={
        fileId: uuidv4(),
        fileName:file?.name,
        isUploaded:false,
        progress:0,
        isCanceled:false,
        file:file,
        getDocumentList:getDocumentList,
        updateData:updateFileData
      }
      fileArray.push(new FileInfo(file, fileObj));
    }
    setFileData((prev: any) => [...prev, ...fileArray]);
    for(let data of fileArray)
    {
      data.upload();
    }
  };
  const showUploadedItems = () => {
    toggleUploadItems(prev=>!prev);
  };
  return (
    <div className="main">
      <Header
        fileUploadHandler={fileUploadHandler}
        isUploaded={isFilesUploadingCompleted(fileData)}
        showUploadedItems={showUploadedItems}
      />
      <DocumentList documentList={documentList} />
      {isVisible &&<UploadingList fileUploadedData={fileData} toggleUploadItem={showUploadedItems}/>}
    </div>
  );
};

export default Layout;
