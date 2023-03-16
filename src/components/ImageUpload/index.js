import React, { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { CheckmarkIcon, LoaderIcon } from "react-hot-toast";
import { CloseSquare } from "react-iconly";

import useUploadMediaMutation from "../../hooks/mutations/useUploadMediaMutation";

import cls from "./style.module.scss";

const ImageUpload = ({ onChange, name, value, error, ...props }) => {
  const [file, setFile] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (value) setFile(value);
    else onChange(name, {});
  }, [value]);

  const {
    mutateAsync: uploadMediaMutation,
    isLoading,
    error: uploadError,
  } = useUploadMediaMutation();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: uploadImage,
    multiple: false,
  });

  const thumb = useMemo(() => {
    return <img src={file?.url} alt={file?.key} className={cls.preview} />;
  }, [file]);

  useEffect(
    () => () => {
      file?.url && URL.revokeObjectURL(file.url);
    },
    [file]
  );

  function uploadImage(files) {
    const image = files[0];

    uploadMediaMutation(image)
      .then((data) => {
        if (data?.success) {
          setLoaded(true);
          setTimeout(() => {
            setFile(data?.data);
            setLoaded(false);
          }, 1000);

          onChange(name, data?.data);
        }
      })
      .catch(console.log);
  }

  const clearInput = () => {
    onChange(name, {});
    setFile(null);
  };

  return (
    <>
      <div className={[cls.container, file ? cls.solid : null].join(" ")}>
        {file?.url ? (
          <div className={cls.preview}>
            {thumb}
            <div className={cls.clear} onClick={clearInput}>
              <CloseSquare />
            </div>
          </div>
        ) : isLoading ? (
          <div className={cls.loading}>
            <LoaderIcon /> Uploading...
          </div>
        ) : loaded ? (
          <div className={cls.loading}>
            <CheckmarkIcon /> Uploaded
          </div>
        ) : uploadError || error ? (
          <div className={cls.error}>
            {JSON.stringify(uploadError?.response?.data?.message) ??
              error ??
              "Something went wrong"}
          </div>
        ) : (
          <div {...getRootProps({ className: cls.dropzone })}>
            <input {...getInputProps()} {...props} />
            <p>Drag 'n' drop file here, or click to select file</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
