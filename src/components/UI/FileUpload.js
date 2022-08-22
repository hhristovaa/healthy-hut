import React from 'react';
import classes from './FileUpload.module.scss'
import Button from './Button';


const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target?.files[0];
    const fileName = fileUploaded?.name;
    props.handleFile(fileUploaded);
  };

  return (
    <>
      <Button version='secondary' type='button' onClick={handleClick}>
        Upload a file
      </Button>
      <input type="file"
      name='fileUpload'
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
      <label htmlFor="fileUpload"></label>
    </>
  );
};
export default FileUploader;