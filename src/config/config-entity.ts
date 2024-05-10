import * as multer from 'multer';
import * as path from 'path';

export const storage = multer.diskStorage({
    destination: 'uploads',
    // destination: function (req, file, cb) {
    //   cb(null, 'uploads');
    // },
    filename: function (req, file, cb) {
        console.log(10000001, file);
        const uniqueSuffix = Date.now();
        const ext = path.parse(file.originalname).ext;
        cb(null, uniqueSuffix + ext);
    },
});

export const serveStaticOptions = {
    rootPath: path.join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads',
};
