import { Request, Response, NextFunction } from 'express';
import slice from '../../../src/store/filters/slice';

// TODO: use real data and replace below
const MOCK_DATA = require('./../../mock/data');

// TODO: these aren't strongly typed correctly due to time limit
function get(request: Request, response: Response, next: NextFunction ) {
    const { query: { page, size }} = request;
    // FIXME: typings
    const numericPage = !!page ? parseInt(page as string, 10) : 1;
    const numericSize = !!size ? parseInt(size as string, 10) : 3;

    if (!!response && !!response.json) {
        return response.json({
            status: 200,
            data: MOCK_DATA.slice((numericPage * numericSize), (numericPage * numericSize) + numericSize),
        });
    }
    
    return ({
        status: '500'
    });
}

export default {
    get,
}