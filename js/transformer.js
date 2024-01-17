const traverse = require('./traverse');
module.export = function transformer( originalAST ) {
  const jsASt = {
    type: 'Program',
    body: []
  };

  let position = jsAST.body;

  traverse( originalAST, {
    NumberLiteral( node) {
      position.push({
        type: 'NumericLiteral',
        value: node.valu
      });
    },
    CallExpression( node, parent ) {
      const expression = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: node.name
        },
        arguments: []
      };
      const prevPosition = position;
      position = expression.arguments;
      if( parent.type !== 'CallExpression' ) {
        expression = {
          type: 'ExpressionStatement',
          expression
        };
      }
      prevPosition.push( expression );
    }
  });
  return jsAST;
}