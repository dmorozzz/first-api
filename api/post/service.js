const multiparty = require('multiparty');

const PostSchema = require('./schema');
const admin = require('firebase-admin');
const { resolve } = require('path');
const { rejects } = require('assert');

const firebaseCredential = require(`../../${process.env.FIREBASE_KEY}`);

admin.initializeApp({
    credential: admin.credential.cert(firebaseCredential),
    databaseURL: "https://first-a1bdc.firebaseio.com"
  });

const bucket = admin.storage().bucket('gs://first-a1bdc.appspot.com/');

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
    return bucket.upload(url);
}

const getPostById = async id => {
    const post = await PostSchema.findById(id);
    if(post == null) {
        throw new Error('Post didnt find');
    }

    return post;
}

const deleteOnePost = async id => {
    return await PostSchema.findByIdAndDelete(id);
}

const getPosts = async query => {
    const { author, page, limit } = query; 
    return await PostSchema.find({ author }, null, { skip: (page - 1) * limit, limit });
}

module.exports = {
    getPostById,
    deleteOnePost,
    promisifyUpload
}