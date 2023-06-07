const request = require('supertest');
const app = require('../server.js');

describe('GET /api/users', () => {
    beforeAll(async () => {
        await request(app)
            .post('/api/files')
            .attach('file', './tests/files/sample.csv');
    });

    it('should return an error when no search term is provided', async () => {
        const res = await request(app).get('/api/users').expect(400);
        expect(res.body).toHaveProperty('error', 'No search term provided');
    });

    it('should return an empty array when no matching results are found', async () => {
        const res = await request(app).get('/api/users?q=xyz').expect(404);
        expect(res.body).toHaveProperty('message', 'No matching results found');
    });

    it('should search for data and return results', async () => {
        const res = await request(app).get('/api/users?q=John').expect(200);
        expect(res.body).toHaveProperty('results');
        expect(res.body.results).toHaveLength(2);
        expect(res.body.results[0]).toHaveProperty('name', 'John Doe');
    });
});
