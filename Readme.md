# minimist-options [![Circle CI](https://circleci.com/gh/vdemedes/minimist-options.svg?style=svg)](https://circleci.com/gh/vdemedes/minimist-options)

Write options for [minimist](https://npmjs.org/package/minimist) in a comfortable way.


### Installation

```
$ npm install minimist-options --save
```


### Usage

**Without** this module:

```js
const minimist = require('minimist');

let options = {
  string: ['name'],
  boolean: ['force', 'published'],
  alias: {
    n: 'name',
    f: 'force'
  },
  default: {
    name: 'john',
    f: false
  }
};

let args = minimist(options);
```

**With** this module:

```js
const buildOptions = require('minimist-options');
const minimist = require('minimist');

let options = {
  name: {
    type: 'string',
    alias: 'n',
    default: 'john'
  },

  force: {
    type: 'boolean',
    alias: 'f',
    default: false
  },

  published: 'boolean'
};

let args = minimist(options);
```


### Tests

[![Circle CI](https://circleci.com/gh/vdemedes/minimist-options.svg?style=svg)](https://circleci.com/gh/vdemedes/minimist-options)

```
$ make test
```


### License

MIT © [Vadym Demedes](http://vadimdemedes.com)
