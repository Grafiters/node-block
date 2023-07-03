const request = require('supertest');
const {server} = require('./server');

describe('Test the Blog route challenge', () => {
    let category = ''
    let id_content = ''
    test('GET /api/blog should return all content', async () => {
        const response = await request(server).get('/api/blog');

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();

        id_content = response.body.data.data[0].id
    });
    test('GET /api/blog/categories should return all category', async () => {
        const response = await request(server).get('/api/blog/categories');

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();

        category = response.body.data.data[0].tag
    });

    test('GET /api/blog?categories should return data content by categories', async () => {
        const response = await request(server).get(`/api/blog?category=${category}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    test('GET /api/blog/search should return content data by serching keyword', async () => {
        const response = await request(server).post(`/api/blog/search`).send({
            keyword: 'maintenance'
        });

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    test('GET /api/blog/{id} should return Geetest challenge', async () => {
        const response = await request(server).get(`/api/blog/${id_content}`)

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});