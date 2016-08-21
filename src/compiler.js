const TOKEN = {
  componentBegin: Symbol('COMPONENT_BEGIN'),
  componentEnd  : Symbol('COMPONENT_END'),
  pipe          : Symbol('PIPE'),
  semicolon     : Symbol('SEMICOLON'),
  equals        : Symbol('EQUALS'),
  nullToken     : Symbol('NULL_TOKEN')
};


class LexerException{
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
    throw new LexerException(`syntax and syntaxTokens length not equal`);
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
        throw new LexerException(`unknown type of syntax: ${syntax[type]}`);
      }
      k = k.substring(syntax[type].length).trim();
    } else {
      tokens.push(k.trim());
      k = '';
    }
  }
  return tokens;
};




class ParserException{
  constructor(message){
    this.type = 'ParserException';
    this.message = message;
  }
}

const syntax = ['{', '}', '||', ';;', '='];
const syntaxTokens = [TOKEN.componentBegin, TOKEN.componentEnd, TOKEN.pipe, TOKEN.semicolon, TOKEN.equals];

// const tokens = lexer(bulletmark, syntax, syntaxTokens);

const componentParser = (tokens)=>{
  const componentObject = {};
  let k = tokens.shift();
  if(typeof k != 'string'){
    throw new ParserException(`component name of type string must be specified; ${k} is not a string`);
  }
  if(/\s/.test(k)){
    throw new ParserException(`component name may not contain whitespace; ${k} has whitespace`);
  }
  componentObject.component = k;
  k = tokens.shift();
  if(k !== TOKEN.componentEnd){
    if(k === TOKEN.pipe){
      componentObject.props = {};
      k = tokens.shift();
      while(k !== TOKEN.pipe){
        const key = k;
        const eq = tokens.shift();
        let value = tokens.shift();
        const semi = tokens.shift();
        if(/\s/.test(key)){
          throw new ParserException(`prop name may not contain whitespace; ${k} has whitespace`);
        }
        if(eq !== TOKEN.equals){
          throw new ParserException(`equals sign missing when defining prop ${key} with ${value}; ${eq} is not an equals sign`);
        }
        if(semi !== TOKEN.semicolon){
          throw new ParserException(`double semicolon missing when defining prop ${key} with ${value}; ${semi} is not a double semicolon`);
        }
        if(!Number.isNaN(Number(value))){
          // if number
          value = Number(value);
        } else if(value == 'true'){
          // if boolean
          value = true;
        } else if(/^\[.*\]$/.test(value)){
          // if array
          value = JSON.parse(value);
        }
        componentObject.props[key] = value;
        k = tokens.shift();
      }

      // difficult logic
      if(tokens[0] !== TOKEN.componentEnd){
        componentObject.children = [];
        while(tokens[0] !== TOKEN.componentEnd){
          if(tokens[0] === TOKEN.componentBegin){
            k = tokens.shift();
            componentObject.children.push(componentParser(tokens));
          } else { // this must be a string

          }
        }
      } else {
        k = tokens.shift();
      }
    } else {
      throw new ParserException(`component ${componentObject.component} not terminated with close brace`);
    }
  }
  return(componentObject);
};

const parser = (tokens)=>{
  const bulletjson = [];
  while(tokens.length > 0){
    let k = tokens.shift();
    switch(k){
      case TOKEN.componentBegin:
        bulletjson.push(componentParser(tokens));
        break;
    }
  }
};

export {parser};
