define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-no-styling-elements',

    message: function () {
      assert.strictEqual(plugin.message, 'Do not style HTML elements directly.');
    }
  });

  registerSuite({
    name: 'polish-no-styling-elements CSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/css.css', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'css' }));

        assert.strictEqual(errors.length, 3);
        assert.equal(errors[0].node.toString().trim(), 'div');
        assert.equal(errors[1].node.toString().trim(), '.cool div');
        assert.equal(errors[2].node.toString().trim(), 'div');
      }));
    }
  });

  registerSuite({
    name: 'polish-no-styling-elements SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 4);
        assert.equal(errors[0].node.toString().trim(), 'div');
        assert.equal(errors[1].node.toString().trim(), 'a');
        assert.equal(errors[2].node.toString().trim(), '.cool div');
        assert.equal(errors[3].node.toString().trim(), 'div');
      }));
    }
  });
});