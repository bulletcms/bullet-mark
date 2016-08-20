const TOKEN = {
  componentBegin   : Symbol('COMPONENT_BEGIN'),
  componentEnd     : Symbol('COMPONENT_END'),
  propsBegin       : Symbol('PROPS_BEGIN'),
  propsEnd         : Symbol('PROPS_END'),
  childrenBegin    : Symbol('CHILDREN_BEGIN'),
  childrenEnd      : Symbol('CHILDREN_END'),
  nullToken        : Symbol('NULL_TOKEN')
};


class LexerException {
  constructor(message){
    this.type = 'LexerException';
    this.message = message;
  }
}

const syntax = ['{', '}', '|'];

const find = (targets, pool)=>{
  const indicies = [];
  for(let i = 0; i < pool.length; i++){
    const k = syntax.indexOf(pool[i]);
    if(k > -1){
      indicies.push([i, pool[i]]);
    }
  }
  return indicies;
}

const lexer = (bulletmark)=>{
  let tokens = [];
  let k = bulletmark.trim();
  while(k.length > 0){

  }
};


const parser = (tokens)=>{

};
