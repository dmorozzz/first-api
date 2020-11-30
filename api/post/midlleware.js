const { 
        promisifyUpload, 
        uploadFile,
        deleteFile 
    } = require('./service');

const getFormData = async (req, res, next) => {
    try {
        const filesData = await promisifyUpload(req);
        const pathToSavedImage = filesData.files.images[0].path; 
        const uploadApis = await uploadFile(pathToSavedImage);
        await deleteFile(pathToSavedImage);
        req.userTextToPost = filesData.fields.text[0];
        req.imageMediaUrl = uploadApis.mediaLink;
        return next();
    } catch (error) {
        return next(error);
    }
} 

module.exports = {
    getFormData
}