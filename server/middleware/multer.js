const multer = require('multer');
const FlakeId = require('flake-idgen');
const intFormat = require('biguint-format');

const flakeId = new FlakeId();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, __dirname.substring(0, __dirname.lastIndexOf('/')) + '/uploads');
    },
    filename(req, file, cb) {
        let prefix = '';
        if(req.originalUrl.includes('projects')) {
            prefix = 'project.' + req.body.githubRepo + '.';
        }
        const id = intFormat(flakeId.next(), 'hex', { prefix: '0x' });
        const i = file.originalname.lastIndexOf('.');
        const ext = i > 0 ? file.originalname.substring(i) : '';
        cb(null, prefix + id + ext);
    }
});

module.exports = multer({ storage });
