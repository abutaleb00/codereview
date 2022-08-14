import React from "react";

function DocumentUploader(props) {
  return (
    <div className="form-group p-col-12 mb-0">
      <label>{props.name}</label>
      <div className="custom-file mb-1">
        <input
          type="file"
          className="custom-file-input"
          onChange={props.handleLock()}
          id={props.id}
          name={props.id}
        />
        <label className="custom-file-label" htmlFor={props.id}>
          {props.brandfileNameToShow === undefined
            ? "Select File"
            : props.brandfileNameToShow}
        </label>
      </div>
      <i
        id={props.cross}
        className="fa fa-times brandCross"
        onClick={(e) => {
          document.getElementById(props.id).value = null;
          document.getElementById(props.cross).style.display = "none";
          props.parentCall();
        }}
        style={{
          fontSize: "1em",
          color: "red",
          float: "right",
          paddingRight: "10px",
          display: "none",
        }}
      ></i>
    </div>
  );
}

export default DocumentUploader;
