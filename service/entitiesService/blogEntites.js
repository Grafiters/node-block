class Blog {
    constructor(resource) {
        if (resource.meta ){
            this.pagination = resource.meta.pagination;
        }else {
            this.pagination = null;
        }
        this.data = resource.tags || resource.posts;
    }
  
    getContentEntities(){
        return this.getDataContentCategory(this.data)
    }

    getCategoryEntities(){
      return this.buildResponseData(this.getDataCategory(this.data))
    }

    getDataContentCategoryEntities(){
        return this.buildResponseData(this.getDataContentCategory(this.data))
    }

    getDataCategory(data){
        return data.map(entities => ({
            id: entities.id,
            name: entities.name,
            tag: entities.slug,
            description: entities.description,
            image_url: entities.feature_image,
            visibility: entities.visibility,
            meta_desctiption: entities.meta_desctiption,
            url: entities.url
        }))
    }

    getDataContentCategory(data){
        return data.map(entities => ({
            id: entities.id,
            uuid: entities.uuid,
            snippet: entities.title,
            tag: entities.slug,
            html: entities.html,
            visibility: entities.visibility,
            image_url: entities.feature_image,
            published_at: entities.published_at,
            url: entities.url,
            reading_time: entities.reading_time,
            excerpt: entities.excerpt,
            author: this.buildAuthorList(entities.authors),
            meta: {
                meta_title: entities.meta_title,
                meta_description: entities.meta_description,
            }
        }))
    }

    buildAuthorList(authorData){
        let authorText = ''
        authorData.forEach(author => {
            if(authorText == ''){
                authorText = author.name
            }else{
                authorText = authorText+` ${author.name}`
            }
        });

        return authorText
    }

    buildResponseData(data){
        return {
            page: this.pagination.page,
            limit: this.pagination.limit,
            total: this.pagination.total,
            next: this.pagination.next,
            prev: this.pagination.prev,
            data: data
        }
    }
}

module.exports = Blog;