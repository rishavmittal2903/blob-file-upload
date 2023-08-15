import React, { useEffect } from "react";
import './DragDropStyle.scss'
interface IProps {
  handleFiles: (event: any) => void;
  children?:any
}
const DragDropComponent = (props: IProps) => {
  const { handleFiles, children } = props;
  const handleDrop = (e: any) => {
    const dt = e.dataTransfer;
    const { files } = dt;
    handleFiles(files);
  };
  const preventDefaults = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  useEffect(() => {
    const dropArea: any = document.getElementById("drop-area");
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults);
    });

    dropArea.addEventListener("drop", handleDrop);
    // eslint-disable-next-line
  }, []);

  return (
    <div id="drop-area" className="drag-drop-container">
      <input
        type="file"
        id="fileElem"
        onChange={(e) => {
          handleFiles(e);
        }}
      />
      <label className="upload-label" htmlFor="fileElem">
      </label>
      {children}
    </div>
  );
};


export default DragDropComponent;