const TOKEN = {
  componentBegin: Symbol('COMPONENT_BEGIN'),
  componentEnd  : Symbol('COMPONENT_END'),
  pipe          : Symbol('PIPE'),
  nullToken     : Symbol('NULL_TOKEN')
};


class LexerException {
  constructor(message){
    this.type = 'LexerException';
    this.message = message;
  }
}

const syntax = ['{', '}', '|'];

const findNext = (targets, pool)=>{
  for(let i = 0; i < pool.length; i++){
    const k = syntax.indexOf(pool[i]);
    if(k > -1){
      return [i, k];
    }
  }
  return [-1, -1];
}

const lexer = (bulletmark)=>{
  const tokens = [];
  let k = bulletmark.trim();
  while(k.length > 0){
    const [index, type] = findNext(syntax, k);
    if(index > -1){
      if(index > 0){
        tokens.push(k.substring(0, index).trim());
        k = k.substring(index);
      }
      switch(type){
        case 0:
          tokens.push(TOKEN.componentBegin);
          break;
        case 1:
          tokens.push(TOKEN.componentEnd);
          break;
        case 2:
          tokens.push(TOKEN.pipe);
        default:
          throw new LexerException('unknown type of syntax: ' + syntax[type]);
      }
      k = k.substring(1);
    } else {
      tokens.push(k);
      k = '';
    }
  }
  return tokens;
};


const parser = (tokens)=>{

};
