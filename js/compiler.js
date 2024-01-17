const tokenizer = require('./tokenizer');
const parser = require('./parser');
const transformer  =require('./transformer');

module.exports = function compiler( input ) {
  // 1. Lexical analysis
  const tokens = tokenizer( input );

  // 2. Syntactic analysis
  const lispAST = parser( tokens );

  // 3. Transformation
  const jsAST = transformer( lispAST );

  return jsAST;
}