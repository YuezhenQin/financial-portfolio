import request from 'supertest';
import app from '../../app.js';

describe('Server', () => {
    test('GET /crypto should return a object containing two values: The symbol of bitcoin and its price.',
        async () => {
            const response = await request(app).get('/crypto');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(Object.keys(response.body)).toHaveLength(2);
        }
    );

    // test cors middleware
    test('CORS headers should present.',
        async () => {
            const response = await request(app).get('/crypto');
            expect(response.headers['access-control-allow-origin']).toBe('*');
        }
    );

    test('should return 404 if route is undefined.', 
        async () => {
            const response = await request(app).get('/undefined-route');
            expect(response.status).toBe(404);
        }
    );
});