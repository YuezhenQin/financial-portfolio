import express from 'express';
import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/cryptocoinService.js', () => ({
    getCryptoCoinInfo: jest.fn(),
    getPriceByName: jest.fn()
}));

describe('Crypto coin routes', () => {

    let cryptocoinService;
    let cryptocoinRoute;


    beforeEach(async () => {
        cryptocoinService = await import('../services/cryptocoinService.js');
        cryptocoinRoute = await import('../routes/cryptocoinRoute.js');
        app = express();
        app.use(express.json());
        app.use('/crypto', cryptocoinRoute.default);

    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    // mock test for /crypo API
    test('GET /crypto should return a object containing two values: The symbol of bitcoin and its price.', async () => {
        const randomCryptoName = 'crypto name'
        const mockCryptoCoinInfo = [{ symbol: randomCryptoName, price: 1.0 }];
        cryptocoinService.getCryptoCoinInfo.mockResolvedValue(mockCryptoCoinInfo);
        const response = await request(app)
            .get('/crypto');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCryptoCoinInfo);
    });

    // mock test for /crypto/cryptoName API
    test('GET /crypto/cryptoName should return a object cotaining two values: The symbol of the selected bitcoin and its price', async () => {
        const randomCryptoName = 'random crypto currency'
        const mockCryptoName = [{ symbol: randomCryptoName, price: 1.0 }];
        cryptocoinService.getPriceByName.mockResolvedValue(mockCryptoName);
        const response = await request(app)
            .get('/crypto/cryptoName')
            .query({cryptoName: randomCryptoName});
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCryptoName);
    });
});