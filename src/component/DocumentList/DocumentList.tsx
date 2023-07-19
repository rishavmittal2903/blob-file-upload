import { AiTwotoneFileExcel } from "react-icons/ai";
import { IColumn, IFileTable, IRow } from "../../interfaces/IFileTable";
import "./DocumentList.scss";
interface IProps {
  documentList: IFileTable;
}
const DocumentList = (props: IProps) => {
  const { documentList } = props;
  return (
    <div className="document">
      <div className="myFileText">My Files</div>
      
        <table>
          <tr>
            <th>
              <AiTwotoneFileExcel />
            </th>
            {documentList.columns.map((column: IColumn) => (
              <th>{column.label}</th>
            ))}
          </tr>

           
            {documentList?.rows.map((row: IRow) => {
              return(

              <tr>
                 <td>
              <AiTwotoneFileExcel />
            </td>
              <td>{row['Name']}</td>
              <td>{row['CreatedOn']}</td>
              <td>{row['ModifiedOn']}</td>
              <td>{row['Size']}</td>
              </tr>
            )})}
        </table>
    </div>
  );
};

export default DocumentList;
