import Pkmn from '../lib';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('pkmn', function () {
    let p;
    this.timeout(5000);

    beforeEach(() => {
        p = new Pkmn();
    });

    describe('constructor', () => {
        it('should have a baseUrl', () => {
            expect(p.baseUrl).to.be.a('string');
            expect(p.baseUrl).to.equal('http://pokeapi.co');
        });

        it('should have a queryUrl', () => {
            expect(p.queryUrl).to.be.a('string');
            expect(p.queryUrl).to.equal('http://pokeapi.co/api/v1');
        });

    });

    describe('buildQuery', () => {
        it('should throw an error for too few arguments', () => {
            return expect(p.buildQuery('pokemon'))
                .to.eventually.be.rejected;
        });

        it('should build a pokemon query', () => {
            expect(p.buildQuery('pokemon', 1))
                .to.eventually.equal('http://pokeapi.co/api/v1/pokemon/1');
        });
    });
    describe('end', () => {
        it('should fail for malformed query', () => {
            p.query = 'ayyy.lmao';
            return expect(p.end()).to.eventually.be.rejected;
        });
    });
    describe('get', () => {
        it('should get resource by name', () => {
            return expect(p.get('pokemon', 'bulbasaur'))
                .to.eventually.be.fulfilled;
        });

        it('should get resource by resource_uri', () => {
            var uri = '/api/v1/description/4';
            return expect(p.get(uri).get('pokemon').get('name'))
                .to.eventually.equal('bulbasaur');
        });

        it('should reject for too few arguments', () => {
            return expect(p.get('pokemon')).to.eventually.be.rejected;
        });

        it('should get several resources for id array', () => {
            let names = p.get('pokemon', ['bulbasaur', 1, 1])
                .reduce((name, poke) =>
                    name === poke.name ? 'Bulbasaur' : false, 'Bulbasaur');


            expect(names).to.eventually.equal('Bulbasaur');
        });
    });
    describe('resource', () => {
        it('should get resource by resource_uri', () => {
            const uri = '/api/v1/description/4/';
            return expect(p.resource(uri).get('pokemon').get('name'))
                .to.eventually.equal('bulbasaur');
        });
    });
    describe('pokemon', () => {
        it('should get pokemon', () => {
            return expect(p.pokemon(1)).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(p.pokemon(1)).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(p.pokemon(1)).to.eventually.have.property('name');
        });

        it('should be \'Bulbasaur\'', () => {
            return expect(p.pokemon(1).get('name'))
                .to.eventually.equal('Bulbasaur');
        });

        it('should fail to get nonexistent pokemon', () => {
            return expect(p.pokemon('Rick_James')).to.eventually.be.rejected;
        });

    });


    describe('game', () => {
        it('should get pokedexs', () => {
            return expect(p.game(1)).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(p.game(1)).to.eventually.be.an('object');
        });

        it('should have a release year', () => {
            return expect(p.game(1))
                .to.eventually.have.property('release_year');
        });

        it('should be 1996', () => {
            return expect(p.game(1).get('release_year'))
                .to.eventually.equal(1996);
        });

        it('should fail to get nonexistent game', () => {
            return expect(p.game('ayyy_lmao')).to.eventually.be.rejected;
        });
    });
    describe('pokedex', () => {
        it('should get the pokedex', () => {
            return expect(p.pokedex(1)).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(p.pokedex(1)).to.eventually.be.an('object');
        });

        it('should have a name property', () => {
            return expect(p.pokedex()).to.eventually.have.property('name');
        });

        it('should be \'national\'', () => {
            return expect(p.pokedex(1).get('name'))
                .to.eventually.equal('national');
        });

    });
    describe('type', () => {
        it('should get type', () => {
            return expect(p.type(1)).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(p.type(1)).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(p.type(1)).to.eventually.have.property('name');
        });

        it('should be \'Normal\'', () => {
            return expect(p.type(1).get('name'))
                .to.eventually.equal('Normal');
        });

        it('should fail to get nonexistent type', () => {
            return expect(p.type('stupid')).to.eventually.be.rejected;
        });
    });
    describe('move', () => {
        it('should get moves', () => {
            return expect(p.move(1)).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(p.move(1)).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(p.move(1)).to.eventually.have.property('name');
        });

        it('should be \'Pound\'', () => {
            return expect(p.move(1).get('name'))
                .to.eventually.equal('Pound');
        });

        it('should fail to get nonexistent moves', () => {
            return expect(p.move('kamehameha')).to.eventually.be.rejected;
        });
    });
    describe('ability', () => {
        it('should get abilities', () => {
            return expect(p.ability(1)).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(p.ability(1)).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(p.ability(1)).to.eventually.have.property('name');
        });

        it('should be \'Stench\'', () => {
            return expect(p.ability(1).get('name'))
                .to.eventually.equal('Stench');
        });

        it('should fail to get nonexistent abilities', () => {
            return expect(p.ability('instant_transmission'))
                .to.eventually.be.rejected;
        });
    });
    describe('egg', () => {
        it('should get eggs', () => {
            return expect(p.egg(1)).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(p.egg(1)).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(p.egg(1)).to.eventually.have.property('name');
        });

        it('should be \'Monster\'', () => {
            return expect(p.egg(1).get('name'))
                .to.eventually.equal('Monster');
        });

        it('should fail to get nonexistent eggs', () => {
            return expect(p.egg('scrambled')).to.eventually.be.rejected;
        });
    });
    describe('description', () => {
        it('should get descriptions', () => {
            return expect(p.description(2)).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(p.description(2)).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(p.description(2)).to.eventually.have.property('name');
        });

        it('should be \'Bulbasaur_gen_1\'', () => {
            return expect(p.description(2).get('name'))
                .to.eventually.equal('Bulbasaur_gen_1');
        });

        it('should fail to get nonexistent descriptions', () => {
            return expect(p.description('super_hairy'))
                .to.eventually.be.rejected;
        });
    });
    describe('sprite', () => {
        it('should get sprites', () => {
            return expect(p.sprite(1)).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(p.sprite(1)).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(p.sprite(1)).to.eventually.have.property('name');
        });

        it('should be \'Bulbasaur_red_blue\'', () => {
            return expect(p.sprite(1).get('name'))
                .to.eventually.equal('Bulbasaur_red_blue');
        });

        it('should fail to get nonexistent sprites', () => {
            return expect(p.sprite('obey_your_thirst'))
                .to.eventually.be.rejected;
        });
    });

});
