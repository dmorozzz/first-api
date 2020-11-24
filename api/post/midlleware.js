const { promisifyUpload } = require('./service');

const authenticationCheck = async (req, res, next) => {
    if (!req.session.username) {
        return res.status(401).json({message: 'user is not authorized'});
        next();
    }

    req.username = req.session.username;
    next();
}

const getFormData = async (req, res, next) => {
    try {
        
        const filesData = await promisifyUpload(req); 
        console.log(filesData);
        
    } catch (error) {
        console.log(error)
    }
    
    // form.parse(req, (err, fields, files) => {
    //     if(err) {
    //         console.log(err);
    //         next(err);
    //     }
    //     fs.unlinkSync(files.file[0].path, console.log);
    //     next()
    // });
} 

module.exports = {
    authenticationCheck,
    getFormData
}