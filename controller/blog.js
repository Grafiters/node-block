const blogService = require('../service/blogService');
const BlogEntities = require('../service/entitiesService/blogEntites');

exports.getContent = async (req, res) => {
    try {
        const categories = await blogService.getContent(15, 1);

        return res.status(200).json({
            success: true,
            data: new BlogEntities(categories).getDataContentCategoryEntities()
        })
    } catch (error) {       
        return res.status(406).json({
            success: false,
            data: 'Kategori blog tidak ditemukan.'
        })
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await blogService.getCategories(15, 1);

        return res.status(200).json({
            success: true,
            data: new BlogEntities(categories).getCategoryEntities()
        })
    } catch (error) {
        
        return res.status(406).json({
            success: false,
            data: 'Kategori blog tidak ditemukan.'
        })
    }
}

exports.getBlogByCategories = async (req, res) => {
    try {
        const categories = await blogService.getBlogByCategories(15, 1, req.query.category);

        return res.status(200).json({
            success: true,
            data: new BlogEntities(categories).getDataContentCategoryEntities()
        })
    } catch (error) {
        
        return res.status(406).json({
            success: false,
            data: 'Kategori blog tidak ditemukan.'
        })
    }
}

exports.getBlogByKeyword = async (req, res) => {
    const { keyword } = req.body
    try {
        const categories = await blogService.getBlogByKeyword(15, 1, keyword);

        return res.status(200).json({
            success: true,
            data: new BlogEntities(categories).getDataContentCategoryEntities()
        })
    } catch (error) {
        
        return res.status(406).json({
            success: false,
            data: 'Keyword blog tidak ditemukan.'
        })
    }
}

exports.getBlogByID = async (req, res) => {
    const { id } = req.params
    try {
        const categories = await blogService.getBlogByID(id);

        return res.status(200).json({
            success: true,
            data: new BlogEntities(categories).getContentEntities()
        })
    } catch (error) {
        return res.status(406).json({
            success: false,
            data: 'Blog berdasarkan id tidak ditermukan.'
        })
    }
}