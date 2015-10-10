import request from 'request';
import Promise from 'bluebird';
import {extend} from './utils.js';

class Pkmn {
    constructor() {
        this.baseUrl = 'http://pokeapi.co';
        this.queryUrl = this.baseUrl + '/api/v1/';
    }

    static listResources() {
        return [
            'pokemon',
            'pokedex',
            'game',
            'egg',
            'ability',
            'type',
            'description',
            'sprite',
            'move'
        ];
    }

    get(resource, id) {
        if (Array.isArray(id)) {
            return Promise.all(id.map(elem => this.get(resource, elem)));
        }
        if (/api\/v1/.test(resource)) {
            return this.resource(resource);
        }
        if (/pokedex/.test(resource)) {
            return this.resource('/api/v1/pokedex/1/');
        }
        if (id === undefined) {
            return this.buildQuery(resource);
        }

        return this.buildQuery(resource, id).bind(this).then(this.end);
    }

    resource(uri) {
        let query = this.baseUrl + uri;
        return this.end(query);
    }

    buildQuery(param, id) {
        if (arguments.length < 2) {
            return Promise.reject(new Error('id argument is required'));
        }
        let query = this.queryUrl + param + '/' + id + '/';
        return Promise.resolve(query);
    }

    end(query) {
        return new Promise((resolve, reject) => {
            request
                .get(query, (err, res, body) => {
                    if (res.statusCode !== 200) {
                        let e = new Error(res.statusCode);
                        return reject(e);
                    }

                    if (err) {
                        return reject(err);
                    }

                    return resolve(JSON.parse(body));
                });
        });
    }
}

extend(Pkmn.prototype, Pkmn.listResources().reduce((obj, item) => {
    obj[item] = function (id) {
        return this.get(item, id);
    };
    return obj;
}, {}));

export default Pkmn;
