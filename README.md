# pkmn [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> pokeapi.co wrapper. Details about the api can be found here: http://pokeapi.co/docs/


## Install

```sh
$ npm install --save pkmn
```


## Usage

```js
var Pkmn = require('pkmn');
var p = new Pkmn();
```

### Get
All methods return a bluebird promise.

`.get` requires two arguments, a `resource` and an `id`. `id` can be a `string`, `number`, or `array`.

```js
p.get('pokemon', 'meowth')
    .then(pokemon => /* do something */)
    .catch(err => /* handle error */);
    
p.get('pokemon', [1, 'mew'])
    .then(console.log) // logs [{name: 'Bulbasaur' ...}, {name: 'Mew'...}]
```

Errors and responses from the pokeapi that are not of status code 200 will
be rejected.

```js
p.get('pokemon', 'Vegeta')
    .catch(console.error) // logs [Error] 404
```

Too few arguments to `.get` also throws an error. All resources except `pokedex` require an `id` argument to passed to `.get` with them. 

```js    
p.get('pokemon')
    .then(console.log)    // doesn't log
    .catch(console.error) // logs [Error] id argument required
    
p.get('pokedex')
    .then(console.log) // logs the pokedex
```

The full list of valid resources is: 

```
pokedex, pokemon, egg, type, description, move, ability, sprite, game
```

Additionally, `.get` can take a `resource_id` as an argument. This is useful because most responses from pokeapi will have have a `resource_id` field. For example, a pokemon will come with a list of moves, each move contains a `resource_id` that you can pass directly to `.get` to retrieve the details of that move.

```js
p.get('/api/v1/pokemon/bulbasaur')
// ...
```


### Convenience Methods

All valid resource argumets to `.get` also have convenience methods: 

```js
p.pokemon([33, 'snorlax', 209])
p.ability(56)
p.egg(2)
p.pokedex()

// etc...
```

The full list of api resources can obtained from the api via `.api`

```js
p.api()
```

## License

MIT © [Stephan Tabor](http://stephantabor.com)

[npm-image]: https://badge.fury.io/js/pkmn.svg
[npm-url]: https://npmjs.org/package/pkmn
[travis-image]: https://travis-ci.org/stephantabor/pkmn.svg?branch=master
[travis-url]: https://travis-ci.org/stephantabor/pkmn
[daviddm-image]: https://david-dm.org/stephantabor/pkmn.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/stephantabor/pkmn
[coveralls-image]: https://coveralls.io/repos/stephantabor/pkmn/badge.svg
[coveralls-url]: https://coveralls.io/r/stephantabor/pkmn
