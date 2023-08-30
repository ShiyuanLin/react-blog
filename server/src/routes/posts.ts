import express from 'express';
import { addPost, addPosts, deletePost, getPost, getPosts, updatePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

router.get('/test', addPosts);

export default router;
