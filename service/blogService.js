require('dotenv').config()
const axios = require('axios');
const {
    GHOST_URL,
    GHOST_API_KEY,
    GHOST_API_CONTEXT,
    GHOST_API_VERSION,
    GHOST_PAGINATION_DEFAULT_LIMIT_VALUE,
    GHOST_PAGINATION_DEFAULT_PAGE_VALUE
} = process.env

async function getContent(limit = GHOST_PAGINATION_DEFAULT_LIMIT_VALUE, page = GHOST_PAGINATION_DEFAULT_PAGE_VALUE){
    const url = `${url_builder()}/posts/?key=${GHOST_API_KEY}${pagination(limit, page)}&${unclue_buidler()}`
    const content = await axios.get(url)

    return content.data
}

async function getCategories(limit = GHOST_PAGINATION_DEFAULT_PAGE_VALUE, page = GHOST_PAGINATION_DEFAULT_PAGE_VALUE){

    const url = `${url_builder()}/tags?key=${GHOST_API_KEY}${pagination(limit, page)}`
    const content = await axios.get(url)

    return content.data
}

async function getBlogByCategories(limit = GHOST_PAGINATION_DEFAULT_PAGE_VALUE, page = GHOST_PAGINATION_DEFAULT_PAGE_VALUE, filter){

    const url = `${url_builder()}/posts/?key=${GHOST_API_KEY}${pagination(limit, page)}&filter=${build_filter_params(filter)}&${unclue_buidler()}`
    const content = await axios.get(url)

    return content.data
}

async function getBlogByKeyword(limit = GHOST_PAGINATION_DEFAULT_PAGE_VALUE, page = GHOST_PAGINATION_DEFAULT_PAGE_VALUE, keyword){

    const url = `${url_builder()}/posts/?key=${GHOST_API_KEY}${pagination(limit, page)}&filter=${build_key_filter_params(keyword)}&${unclue_buidler()}`
    const content = await axios.get(url)

    return content.data
}

async function getBlogByID(id){
    const url = `${url_builder()}posts/${id}?key=${GHOST_API_KEY}&${unclue_buidler()}`
    const content = await axios.get(url)

    return content.data
}

function unclue_buidler(){
    return `include=authors`
}

function build_filter_params(categories){
    return `tag:${categories}`
}

function build_key_filter_params(key){
    return `title:~'${key}'`
}

function url_builder(){
    return `${GHOST_URL}/blog/ghost/api/${GHOST_API_VERSION}/${GHOST_API_CONTEXT}/`
}

function pagination(limit, page){
    return `&limit=${limit}&page=${page}`
}

module.exports = {
    getBlogByCategories,
    getBlogByKeyword,
    getCategories,
    getBlogByID,
    getContent
}