import "react-dropzone-uploader/dist/styles.css";
import React from "react";
import Dropzone from "react-dropzone-uploader";

const PhotoUploader = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      inputContent={
        <img
          src={process.env.PUBLIC_URL + "/file-upload.png"}
          width="250px"
          height="auto"
        />
      }
      accept="image/*,audio/*,video/*,pdf/*"
      styles={{ dropzone: { width: 350, height: 170 } }}
    />
  );
};

export default PhotoUploader;
