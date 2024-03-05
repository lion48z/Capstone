import Dropzone from 'react-dropzone-uploader';

const MyUploader = () => {
   
    const getUploadParams = ({ meta }) => { return { url: 'http://localhost:3001/auth/register' } }  // do a base url for this 
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
   
    // receives array of files that are done uploading when submit button is clicked
    const handlePhotoSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }
  
    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onDrop={handlePhotoSubmit}
        accept="image/*,audio/*,video/*"
      />
    )
  }
  

export default MyUploader