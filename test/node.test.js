const request = require('supertest');
const model = require('../db/models')
const {server} = require('./server');

describe('Test the Blockchain route challenge', () => {
    test('POST /api/login should return user data success and token access', async () => {
        const paramsUser = {
          email: '111201710284@mhs.dinus.ac.id',
          password: 'Alone123!*',
        }
  
        const paramsAdmin = {
            email: 'alone@kuacislayer.id',
            password: 'Alone123!*',
        }

        const userResponse = await request(server).post('/api/auth/login').send(paramsUser);
        const adminResponse = await request(server).post('/api/auth/login').send(paramsAdmin);
  
        userAccessToken = userResponse.body.token
        tokenAdminAkses = adminResponse.body.token

        expect(userResponse.status).toBe(200);
        expect(userResponse.body).toBeTruthy();

        console.log(adminResponse.body);
        expect(adminResponse.status).toBe(200);
        expect(adminResponse.body).toBeTruthy();
    });

    test('GET /api/node should return node blockchain data for user', async () => {
        const nodeBlockchainUser = await request(server).get('/api/node').set('token', `${userAccessToken}`)

        console.log(nodeBlockchainUser.body);
        expect(nodeBlockchainUser.status).toBe(200);
        expect(nodeBlockchainUser.body).toBeTruthy();
    })

    // test('GET /api/node should return node blockchain data for admin', async () => {
    //     const nodeBlockchainUser = await request(server).get('/api/node').set('token', `${tokenAdminAkses}`)

    //     expect(nodeBlockchainUser.status).toBe(200);
    //     expect(nodeBlockchainUser.body).toBeTruthy();
    // })

    // test('POST /api/node should return node blockchain successfully added', async () => {
    //     const getData = await request(server).get('/api/blockchain');

    //     const params = {
    //         blockchain_id: getData.body.data[1].blockchain_id,
    //         connection_speed: "High",
    //         api_interface: "JSON-RPC",
    //         endpoint: "https://rpc.example.com",
    //         documentation_link: "https://docs.example.com"
    //     }
    //     const nodeBlockchainUser = await request(server).post('/api/node/add').set('token', `${tokenAdminAkses}`).send(params)

    //     const paramsSecond = {
    //         blockchain_id: getData.body.data[1].blockchain_id,
    //         connection_speed: "Hight",
    //         api_interface: "WS",
    //         endpoint: "https://rpc.example.com",
    //         documentation_link: "https://docs.example.com"
    //     }
    //     const nodeBlockchain = await request(server).post(`/api/node/add`).set('token', `${tokenAdminAkses}`).send(paramsSecond)

    //     expect(nodeBlockchainUser.status).toBe(201);
    //     expect(nodeBlockchainUser.body.message).toBe('Node blockchain successfully added.');
    // })

    // test('POST /api/node should return node blockchain failed added', async () => {
    //     const params = {
    //         blockchain_id: '1234',
    //         connection_speed: "High",
    //         api_interface: "JSON-RPC",
    //         endpoint: "https://rpc.example.com",
    //         documentation_link: "https://docs.example.com"
    //     }
    //     const nodeBlockchainUser = await request(server).post('/api/node/add').set('token', `${tokenAdminAkses}`).send(params)

    //     expect(nodeBlockchainUser.status).toBe(422);
    //     expect(nodeBlockchainUser.body.message).toBe('Blockchain not found');
    // })

    // test('POST /api/node should return node blockchain successfully added', async () => {
    //     const node = await request(server).get('/api/node').set('token', `${tokenAdminAkses}`)

    //     const params = {
    //         connection_speed: "Medium",
    //         api_interface: "JSON-RPC",
    //         endpoint: "https://rpc.example.com",
    //         documentation_link: "https://docs.example.com"
    //     }
    //     const nodeBlockchainUser = await request(server).post(`/api/node/edit/${node.body.data[0].id}`).set('token', `${tokenAdminAkses}`).send(params)

    //     expect(nodeBlockchainUser.status).toBe(201);
    //     expect(nodeBlockchainUser.body.message).toBe('Node blockchain successfully updated.');
    // })

    // test('POST /api/node should return node blockchain failed added', async () => {
    //     const node = await request(server).get('/api/node').set('token', `${tokenAdminAkses}`)

    //     const params = {
    //         blockchain_id: '1234',
    //         connection_speed: "High",
    //         api_interface: "JSON-RPC",
    //         endpoint: "https://rpc.example.com",
    //         documentation_link: "https://docs.example.com"
    //     }
    //     const nodeBlockchainUser = await request(server).post(`/api/node/edit/${node.body.data[0].id}`).set('token', `${tokenAdminAkses}`).send(params)

    //     expect(nodeBlockchainUser.status).toBe(422);
    //     expect(nodeBlockchainUser.body.message).toBe('Blockchain not found');
    // })
});