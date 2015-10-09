# pkmn [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> pokeapi wrapper


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

`.get` requires two arguments, a `resource` and an `id`. Details can be found here: http://pokeapi.co/docs/

```js
p.get('pokemon', 'meowth')
    .then(pokemon => /* do something */)
    .catch(err => /* handle error */);
    
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
### Convenience Methods

All valid resource argumets to `.get` also have convenience methods: 
```js
p.pokemon(33)
p.pokemon('mew')
p.egg(2)
p.pokedex()

// etc...
```

## License

MIT © [Stephan Tabor](http://stephantabor.com)


[npm-image]: https://badge.fury.io/js/pkmn.svg
[npm-url]: https://npmjs.org/package/pkmn
[travis-image]: https://travis-ci.org/stephantabor/pkmn.svg?branch=master
[travis-url]: https://travis-ci.org/stephantabor/pkmn
[daviddm-image]: https://david-dm.org/stephantabor/pkmn.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/stephantabor/pkmn
