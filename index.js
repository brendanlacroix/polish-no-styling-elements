var htmlTags   = require('html-tags');

module.exports = {
  message : 'Do not style HTML elements directly.',
  name : 'no-styling-elements',
  test : function(ast) {
    var errors = [];

    ast.traverse(function(node) {
      var selector;

      if (node.type !== 'simpleSelector') {
        return;
      }

      selector = node.toString();
      selector = selector.replace(/(\r\n|\n|\r)/gm,"");
      selector = selector.replace(/\s\s+/g, ' ');
      selector = selector.replace(/(\w)\.(\w)/g, '$1 .$2');
      selector = selector.split(' ');

      selector.forEach(function(string) {
        if (htmlTags.indexOf(string) !== -1) {
          errors.push({
            node    : node,
            message : string
          });
        }
      });
    });

    return errors;
  }
};
