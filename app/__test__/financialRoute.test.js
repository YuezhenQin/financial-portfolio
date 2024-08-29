import express from 'express';
import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/financialService.js', () => ({
    getAllStockInfo: jest.fn(),
    getStockNames: jest.fn(),
    getStartDatePriceByName: jest.fn(),
    getHistoryPriceByName: jest.fn(),
    getStockPriceByNameAndDate: jest.fn(),
    getUserStockByUserName: jest.fn(),
    updateUserStockSharesByName: jest.fn(),
    insertUserStock: jest.fn(),
    getStocksByUser: jest.fn(),
    getUserTotalGain: jest.fn(),
}));

describe('Financial routes', () => {

    let financialService;
    let financialRoute;


    beforeEach(async () => {
        financialService = await import('../services/financialService.js');
        financialRoute = await import('../routes/financialRoute.js');
        app = express();
        app.use(express.json());
        app.use('/oneInvest', financialRoute.default);

    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    // // mock test for /crypo API
    // test('GET /crypto should return a object containing two values: The symbol of bitcoin and its price.', async () => {
    //     const randomCryptoName = 'crypto name'
    //     const mockCryptoCoinInfo = [{ symbol: randomCryptoName, price: 1.0 }];
    //     cryptocoinService.getCryptocoinInfo.mockResolvedValue(mockCryptoCoinInfo);
    //     const response = await request(app)
    //         .get('/crypto');
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual(mockCryptoCoinInfo);
    // });

    // // mock test for /crypto/cryptoName API
    // test('GET /crypto/cryptoName should return a object cotaining two values: The symbol of the selected bitcoin and its price', async () => {
    //     const randomCryptoName = 'random crypto currency'
    //     const mockCryptoName = [{ symbol: randomCryptoName, price: 1.0 }];
    //     cryptocoinService.getPriceByName.mockResolvedValue(mockCryptoName);
    //     const response = await request(app)
    //         .get('/crypto/cryptoName')
    //         .query({cryptoName: randomCryptoName});
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual(mockCryptoName);
    // });
});