const express=require('express');
const cors=require('cors');
const app=express();
const db=require('./lib/db');
const path=require('path');

const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/signup',require('./routes/signup'));
app.use('/api/login',require('./routes/login'));
app.use('/api/signout',require('./routes/signout'));
app.use('/api/userPicture',require('./routes/user-profile-picture'));
app.use('/api/uploadPhoto',require('./routes/addProfilePhoto'));
app.use('/api/uploadImage',require('./routes/addImages'));
app.use('/uploads', express.static(path.join(__dirname, 'localstorage/images')));
app.use('/api/createPost',require('./routes/createPost'));
app.use('/api/getAllPosts',require('./routes/getAllPosts'));
app.use('/api/getYourPosts',require('./routes/getYourPosts'));
app.use('/api/isLiked',require('./routes/isLiked'));
app.use('/api/likePost',require('./routes/likePost'));
app.use('/api/getNotifications',require('./routes/getYourNotifications'));
app.use('/api/getLikedPosts',require('./routes/yourLikedPosts'));
app.use('/api/isSaved',require('./routes/isSaved'));
app.use('/api/savePost',require('./routes/savePost'));
app.use('/api/getSavedPosts',require('./routes/yourSavedPosts'));

app.get('/',(req,res)=>{
    res.send({status:200});
});
app.listen(port, () => {
    console.log('Server is running without problems!! port: ' + port);
});
