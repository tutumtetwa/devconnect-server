const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/devconnect');

const Post = mongoose.model('Post', { name: String, message: String });

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send(post);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
