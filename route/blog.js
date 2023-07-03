const { Router } = require('express');
const BlogRouter = new Router();

const blogRouter = require('../controller/blog');

BlogRouter.get('/', blogRouter.getContent);
BlogRouter.get('/categories', blogRouter.getCategories);
BlogRouter.get('/:id', blogRouter.getBlogByID);

BlogRouter.post('/search', blogRouter.getBlogByKeyword);

module.exports = BlogRouter;