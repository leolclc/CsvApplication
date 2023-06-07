const request = require('supertest');
const app = require('../server.js');

describe('POST /api/files', () => {
    it('should upload a CSV file', async () => {
        const response = await request(app)
            .post('/api/files')
            .attach('file', './tests/files/sample.csv');

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('File uploaded successfully');
    });

    it('should return an error when no file is uploaded', async () => {
        const response = await request(app).post('/api/files');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'No file uploaded' });
    });

    it('should return an error when an invalid file format is uploaded', async () => {
        const res = await request(app)
            .post('/api/files')
            .attach('file', './tests/files/invalid.txt')
            .expect(400);
        expect(res.body).toHaveProperty('error', 'Invalid file format. Only CSV files are allowed');
    });
});