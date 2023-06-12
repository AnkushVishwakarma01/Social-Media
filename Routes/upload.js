var multer = require('multer');

var storage = multer.diskStorage({
    destination: '/Public/images',
    filename: (req, file, cb) => {
        //cb(null, Date.now(+file+originalname))
        cb(null, file.originalname)
    }
}) 

var upload = multer({
    storage: storage
})

module.exports = upload;