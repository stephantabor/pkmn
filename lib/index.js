import request from 'request';
import Promise from 'bluebird';

class Pkmn {
    constructor() {
        this.baseUrl = 'http://pokeapi.co';
        this.queryUrl = this.baseUrl + '/api/v1/';
        this.query = this.queryUrl;
    }

    get(resource, id) {
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
        //return this.end();
    }

    resource(uri) {
        this.query = this.baseUrl + uri;
        return this.end();
    }

    move(id) {
        return this.get('move', id);
    }

    game(id) {
        return this.get('game', id);
    }

    sprite(id) {
        return this.get('sprite', id);
    }

    description(id) {
        return this.get('description', id);
    }

    egg(id) {
        return this.get('egg', id);
    }

    ability(id) {
        return this.get('ability', id);
    }

    pokemon(id) {
        return this.get('pokemon', id);
    }

    pokedex() {
        return this.get('pokedex', 1);
    }

    type(id) {
        return this.get('type', id);
    }

    buildQuery(param, id) {
        if (arguments.length < 2) {
            return Promise.reject(new Error('id argument is required'));
        }

        this.query += param + '/' + id + '/';
        return Promise.resolve(this.query);
    }

    end() {
        let q = this.query.slice();
        this.query = this.queryUrl;
        return new Promise((resolve, reject) => {
            request
                .get(q, (err, res, body) => {
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

export default Pkmn;
