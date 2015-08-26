'use strict';

/**
 * Dependencies
 */

var buildOptions = require('./');
var expect = require('chai').expect;


/**
 * Tests
 */

describe ('minimist-options', function () {

  it ('string option', function () {
    var srcOptions = {
      name: 'string'
    };

    var expectedOptions = {
      string: ['name']
    };

    test(srcOptions, expectedOptions);
  });

  it ('boolean option', function () {
    var srcOptions = {
      force: 'boolean'
    };

    var expectedOptions = {
      boolean: ['force']
    };

    test(srcOptions, expectedOptions);
  });

  it ('number option', function () {
    var srcOptions = {
      amount: 'number'
    };

    var expectedOptions = {};

    test(srcOptions, expectedOptions);
  });

  it ('alias', function () {
    var srcOptions = {
      amount: {
        alias: 'a'
      }
    };

    var expectedOptions = {
      alias: {
        a: 'amount'
      }
    };

    test(srcOptions, expectedOptions);
  });

  it ('alias array', function () {
    var srcOptions = {
      amount: {
        aliases: ['a', 'amnt']
      }
    };

    var expectedOptions = {
      alias: {
        a: 'amount',
        amnt: 'amount'
      }
    };

    test(srcOptions, expectedOptions);
  });

  it ('alias and string', function () {
    var srcOptions = {
      name: {
        type: 'string',
        alias: 'n'
      }
    };

    var expectedOptions = {
      string: ['name'],
      alias: {
        n: 'name'
      }
    };

    test(srcOptions, expectedOptions);
  });

  it ('alias and boolean', function () {
    var srcOptions = {
      force: {
        type: 'boolean',
        alias: 'f'
      }
    };

    var expectedOptions = {
      boolean: ['force'],
      alias: {
        f: 'force'
      }
    };

    test(srcOptions, expectedOptions);
  });

  it ('alias and number', function () {
    var srcOptions = {
      amount: {
        type: 'number',
        alias: 'a'
      }
    };

    var expectedOptions = {
      alias: {
        a: 'amount'
      }
    };

    test(srcOptions, expectedOptions);
  });

  it ('default value', function () {
    var srcOptions = {
      amount: {
        default: 10
      }
    };

    var expectedOptions = {
      default: {
        amount: 10
      }
    };

    test(srcOptions, expectedOptions);
  });

});


/**
 * Helpers
 */

function test (srcOptions, expectedOptions) {
  var destOptions = buildOptions(srcOptions);

  expect(destOptions).deep.equal(expectedOptions);
}
