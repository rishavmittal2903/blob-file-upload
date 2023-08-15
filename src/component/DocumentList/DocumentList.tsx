import { AiTwotoneFileExcel } from "react-icons/ai";
import { IColumn, IFileTable, IRow } from "../../interfaces/IFileTable";
import { downloadFileToBuffer } from "../../utility/utility";
import "./DocumentList.scss";
interface IProps {
  documentList: IFileTable;

}
const DocumentList = (props: IProps) => {
  const { documentList } = props;
  const downloadFile=(blobName:string, type:string)=>{
    downloadFileToBuffer(blobName, type);
  }
  return (
    <div className="document">
      <div className="myFileText">My Files</div>

      <table>
        <thead>
          <tr>
            <th>
              <AiTwotoneFileExcel />
            </th>
            {documentList.columns.map((column: IColumn, columnKey: number) => (
              <th key={columnKey}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {documentList?.rows.map((row: IRow, keyNumber: number) => {
            return (
              <tr key={`${row["Name"]}_${keyNumber}`}>
                <td>
                  <AiTwotoneFileExcel />
                </td>
                <td title="download file" className='downloadFile' role='button' onClick={()=>downloadFile(row["Name"], row['type'])}>{row["Name"]}</td>
                <td>{row["CreatedOn"]}</td>
                <td>{row["ModifiedOn"]}</td>
                <td>{row["Size"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;
