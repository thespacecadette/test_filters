import { Request, Response, NextFunction } from 'express';

// TODO: use real data and replace below
const MOCK_DATA = require('./../../mock/data');

// TODO: these aren't strongly typed correctly due to time limit
function get(request: Request, response: Response, next: NextFunction ) {
    if (!!response && !!response.json) {
        return response.json({
            status: 200,
            data: MOCK_DATA,
        });
    }
    
    return ({
        status: '500'
    });
}

export default {
    get,
}