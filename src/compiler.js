const TOKEN = {
  componentBegin: Symbol('COMPONENT_BEGIN'),
  componentEnd  : Symbol('COMPONENT_END'),
  pipe          : Symbol('PIPE'),
  semicolon     : Symbol('SEMICOLON'),
  equals        : Symbol('EQUALS'),
  nullToken     : Symbol('NULL_TOKEN')
};


class LexerException {
  constructor(message){
    this.type = 'LexerException';
    this.message = message;
  }
}

/**
 * find next symbol in a given string
 * @param  {Array[String]} targets
 * @param  {String} pool
 * @return {Tuple(index, type)}
 */
const findNext = (targets, pool)=>{
  let firstSymbolIndex = null;
  let firstSymbol = null;
  for(let i = 0; i < syntax.length; i++){
    const k = pool.indexOf(targets[i]);
    if(k > -1 && (firstSymbolIndex === null || k < firstSymbolIndex)){
      firstSymbolIndex = k;
      firstSymbol = i;
    }
  }

  if(firstSymbolIndex !== null){
    return [firstSymbolIndex, firstSymbol];
  } else {
    return [-1, -1];
  }
}

const lexer = (bulletmark, syntax, syntaxTokens)=>{
  if(syntax.length !== syntaxTokens.length){
    throw new LexerException('syntax and syntaxTokens length not equal');
  }
  const tokens = [];
  let k = bulletmark.trim();
  while(k.length > 0){
    const [index, type] = findNext(syntax, k);
    if(index > -1){
      if(index > 0){
        tokens.push(k.substring(0, index).trim());
        k = k.substring(index);
      }
      if(type < syntaxTokens.length){
        tokens.push(syntaxTokens[type]);
      } else {
        throw new LexerException('unknown type of syntax: ' + syntax[type]);
      }
      k = k.substring(syntax[type].length).trim();
    } else {
      tokens.push(k.trim());
      k = '';
    }
  }
  return tokens;
};




const syntax = ['{', '}', '||', ';;', '='];
const syntaxTokens = [TOKEN.componentBegin, TOKEN.componentEnd, TOKEN.pipe, TOKEN.semicolon, TOKEN.equals];

const parser = (tokens)=>{
  lexer(testbulletmark, syntax, syntaxTokens);
};

export {parser};
