const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
const s3 = new AWS.S3({  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `videos/${Date.now()}-${file.originalname}`);
    }
  })
});

app.post('/upload', upload.single('video'), (req, res) => {
    console.log('Uploaded file info:', req.file);
    res.send({ url: req.file.location });
  });
  
app.get('/videos', async (req, res) => {
    const params = {
      Bucket: process.env.S3_BUCKET
      // No Prefix: 'videos/'
    };
  
    try {
      const data = await s3.listObjectsV2(params).promise();
      const files = data.Contents.map(obj => ({
        key: obj.Key,
        url: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`
      }));
      res.json(files);
    } catch (err) {
      console.error('Error listing videos from S3:', err);
      res.status(500).json({ error: 'Failed to list videos' });
    }
  });
  
app.listen(5000, () => console.log('Backend running on port 5000'));
