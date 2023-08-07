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
                <td>{row["Name"]}</td>
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
