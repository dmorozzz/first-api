const multiparty = require('multiparty');
const { unlink } = require('fs/promises');

const PostSchema = require('./schema');
const admin = require('firebase-admin');

const firebaseCredential = require('../../fbf678c99abb575050d8.json');

admin.initializeApp({
    credential: admin.credential.cert(firebaseCredential),
    databaseURL: process.env.STORAGE_URL
  });

const bucket = admin.storage().bucket(process.env.BUCKET_URL);

const multipartyFormOptions = {
    autoFiles: true,
    uploadDir: __dirname + '/images',
};

const promisifyUpload = req => new Promise((resolve, reject) => {
    const form = new multiparty.Form(multipartyFormOptions); 

    form.parse(req, function(err, fields, files) {
        if (err) return reject(err);

        return resolve({fields, files});
    });
})



const uploadFile = async url => {
    const [file] = await bucket.upload(url, { public: true });
    return file.metadata;
}

const getPostById = async id => {
    return await PostSchema.findById(id);
}

const deleteFile = async url => unlink(url); 

const deleteOnePost = async id => {
    return await PostSchema.findByIdAndDelete(id);
}

const getPosts = async query => {
    let { author, page, limit } = query; 
    
    if(!page || page < 1) {
        page = 1;
    }

    if(!limit || limit < 1) {
        limit = 10;
    }

    return await PostSchema.find({ author }, null, { skip: (page - 1) * limit, limit });
}

module.exports = {
    getPostById,
    deleteOnePost,
    promisifyUpload,
    uploadFile,
    deleteFile,
    getPosts
}