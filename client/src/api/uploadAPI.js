import { uploadFile, deleteFile } from 'react-s3';

const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET,
    accessKeyId: process.env.REACT_APP_AWS_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET,
    region: 'ca-central-1'
}

export const addFile = (file) => uploadFile(file, config)
export const removeFile = (name) => deleteFile(name, config)

const uploadAPI = {
    addFile,
    removeFile
};

export default uploadAPI;