var Transformer = require('../../../lib/waterline/core/transformations'),
    assert = require('assert');

describe('Core Transformations', function() {

  describe('initialize', function() {

    describe('with string columnName', function() {
      var transformer;

      before(function() {
        var attributes = {
          name: 'string',
          username: {
            columnName: 'login'
          }
        };

        transformer = new Transformer(attributes);
      });

      it('should set a username transformation', function() {
        assert(transformer._transformations.username === 'login');
      });
    });

    describe('with function columnName', function() {
      var attributes;

      before(function() {
        attributes = {
          name: 'string',
          username: {
            columnName: function() {}
          }
        };
      });

      it('should NOT set a username transformation', function() {
        var msg = (function() {
          try {
            new Transformer(attributes);
          } catch(e) {
            return e.message;
          }
          return '';
        })();

        assert(msg == 'columnName transformation must be a string');
      });
    });
  });

  describe('serialize', function() {
    var transformer;

    before(function() {
      var attributes = {
        name: 'string',
        username: {
          columnName: 'login'
        }
      };

      transformer = new Transformer(attributes);
    });

    it('should change username key to login', function() {
      var values = transformer.serialize({ username: 'foo' });
      assert(values.login);
      assert(values.login === 'foo');
    });
  });

  describe('unserialize', function() {
    var transformer;

    before(function() {
      var attributes = {
        name: 'string',
        username: {
          columnName: 'login'
        }
      };

      transformer = new Transformer(attributes);
    });

    it('should change login key to username', function() {
      var values = transformer.unserialize({ login: 'foo' });
      assert(values.username);
      assert(values.username === 'foo');
    });
  });

});
