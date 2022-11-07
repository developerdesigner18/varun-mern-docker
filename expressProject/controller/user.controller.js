var dotenv = require('dotenv');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
const joi = require('joi');
const AWS = require('aws-sdk');
const fs = require('fs');
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const signIn = async (req, res) => {
  try {
    const SignUpSchema = joi.object({
      username: joi.string().required(),
      password: joi.string().min(8).max(20).required(),
    });

    const { error, value } = SignUpSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .send({ success: false, error: error.details[0]?.message });
      return;
    }

    const { username, password } = value;

    const existingUser = await User.findOne({ username });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      {
        name: existingUser.name,
        username: existingUser.username,
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

const signUp = async (req, res) => {
  try {
    const SignInSchema = joi.object({
      username: joi.string().required(),
      password: joi.string().min(8).max(20).required(),
    });

    const { error, value } = SignInSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .send({ success: false, error: error.details[0]?.message });
      return;
    }

    const { username, password } = value;
    console.log('value', value);
    // const existingUser = await User.findOne({ username }).lean().exec();
    // console.log('existingUser', existingUser);
    // if (existingUser) {
    //   return res
    //     .status(400)
    //     .json({ message: 'User already exist.', success: false });
    // }

    const encryptedPassword = await bcrypt.hash(password, 12);
    console.log('encryptedPassword', encryptedPassword);
    const result = await User.create({
      username,
      password: encryptedPassword,
    });

    if (result) {
      res.status(200).json({
        result: result,
        message: 'Congrats you successfully register with us',
        success: true,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong.', error: error });
  }
};

const insertUserDetail = async (req, res) => {
  try {
    const SignInSchema = joi.object({
      name: joi.string().optional(),
      biodata: joi.string().optional(),
    });
    const { error, value } = SignInSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .send({ success: false, error: error.details[0]?.message });
      return;
    }
    if (req.file) {
      const fileContent = fs.readFileSync(req.file?.path);
      // Setting up S3 upload parameters
      const params = {
        ACL: 'public-read',
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: req.file.filename, // File name you want to save as in S3
        Body: fileContent,
      };
      // Uploading files to the bucket
      const uploadedImage = s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        return data.Location;
      });

      const location = await uploadedImage.promise();
      value.profile_pic = location.Location;
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: req.userId },
      { ...value }
    )
      .lean()
      .exec();

    if (updateUser) {
      res.status(200).json({
        success: true,
        message: 'User Profile Updated',
        result: { ...updateUser, ...value },
      });
      return;
    }

    res
      .status(403)
      .json({ success: false, message: 'Oops some error occurred' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error });
  }
};

const fetchAllUserDetail = async (req, res) => {
  try {
    const fetchData = await User.find(
      {},
      { password: 0, username: 0, _id: 0, __v: 0 }
    )
      .lean()
      .exec();

    res.status(200).json({ success: true, data: fetchData });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error });
  }
};

module.exports = { signIn, signUp, insertUserDetail, fetchAllUserDetail };
