import data from './data';

let requestStub = {
    get: (query, cb) => {
        let body = JSON.stringify(data[query]);

        if (data[query] === undefined) {
            return cb(null, {statusCode: 404}, null);
        } else {
            return cb(null, {statusCode: 200}, body);
        }
    }
};

export default requestStub;
