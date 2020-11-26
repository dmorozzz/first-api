const { 
        promisifyUpload, 
        uploadFile,
        deleteFile 
    } = require('./service');

const authenticationCheck = async (req, res, next) => {
    if (!req.session.username) {
        res.status(401).json({message: 'user is not authorized'});
        return next();
    }

    req.username = req.session.username;
    return next();
}

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
        console.log(error)
        res.status(500).json({message: 'Something went wrong'});
        return next(error);
    }
} 

module.exports = {
    authenticationCheck,
    getFormData
}