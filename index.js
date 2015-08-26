'use strict';

/**
 * Dependencies
 */

var is = require('is_js');


/**
 * Expose option builder
 */

module.exports = buildOptions;


/**
 * Build options for minimist module
 */

function buildOptions (options) {
  // result object for minimist
  var result = {};

  // keys of options
  var keys = Object.keys(options);

  keys.forEach(function (key) {
    var value = options[key];

    // if short form is used
    // convert it to long form
    // e.g. { 'name': 'string' }
    if (is.string(value)) {
      value = {
        type: value
      };
    }

    if (is.object(value)) {
      var props = value;

      // option type
      if (props.type) {
        var type = props.type;

        if (type === 'string') {
          push(result, 'string', key);
        }

        if (type === 'boolean') {
          push(result, 'boolean', key);
        }
      }

      // option aliases
      var aliases = props.alias || props.aliases || [];

      if (is.not.array(aliases)) {
        aliases = [aliases];
      }

      aliases.forEach(function (alias) {
        insert(result, 'alias', alias, key);
      });

      // option default value
      if (props.default) {
        insert(result, 'default', key, props.default);
      }
    }
  });

  return result;
}


/**
 * Helpers
 */


/**
 * Push a new item to an array
 * and create an array at `prop` key,
 * if it does not exist
 *
 * @param  {Object} obj
 * @param  {String} prop
 * @param  {Mixed} value
 */

function push (obj, prop, value) {
  if (!obj[prop]) {
    obj[prop] = [];
  }

  obj[prop].push(value);
}


/**
 * Insert a new key to an object
 * and create an object at `prop` key,
 * if it does not exist
 *
 * @param  {Object} obj
 * @param  {String} prop
 * @param  {String} key
 * @param  {Mixed} value
 */

function insert (obj, prop, key, value) {
  if (!obj[prop]) {
    obj[prop] = {};
  }

  obj[prop][key] = value;
}
