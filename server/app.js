// app.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Blog from './model/Blog.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create a new blog post object
const article = new Blog({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
  });
  // Insert the article in our MongoDB database
await article.save();
const firstArticle = await Blog.findOne({});
console.log(firstArticle);


app.get('/', async (req, res) => {
    try {
      const objectId = '680c61db79027a60897787c5';
      const document = await Blog.findById(objectId);
  
      if (!document) {
        return res.status(404).send('Document not found');
      }
  
      res.json(document); // send the whole document as JSON
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

app.listen(8080, () => {
    console.log('server listening on 8080');
});
