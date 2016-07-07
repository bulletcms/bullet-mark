const TOKEN = {
  sectionBegin     : Symbol('SECTION_BEGIN'),
  sectionEnd       : Symbol('SECTION_END'),
  codeBlock        : Symbol('CODE_BLOCK'),
  paragraphBegin   : Symbol('PARAGRAPH_BEGIN'),
  paragraphEnd     : Symbol('PARAGRAPH_END'),
  heading          : Symbol('HEADING'),
  headingOrdered   : Symbol('HEADING_ORDERED'),
  listBegin        : Symbol('LIST_BEGIN'),
  listEnd          : Symbol('LIST_END'),
  listOrderedBegin : Symbol('LIST_ORDERED_BEGIN'),
  listOrderedEnd   : Symbol('LIST_ORDERED_END'),
  image            : Symbol('IMAGE'),
  styleBegin       : Symbol('STYLE_BEGIN'),
  styleEnd         : Symbol('STYLE_END'),
  styleBold        : Symbol('STYLE_BOLD'),
  styleItalics     : Symbol('STYLE_ITALICS'),
  styleUnderline   : Symbol('STYLE_UNDERLINE'),
  componentBegin   : Symbol('COMPONENT_BEGIN'),
  componentEnd     : Symbol('COMPONENT_END'),
  propsBegin       : Symbol('PROPS_BEGIN'),
  propsEnd         : Symbol('PROPS_END'),
  childrenBegin    : Symbol('CHILDREN_BEGIN'),
  childrenEnd      : Symbol('CHILDREN_END')
};

let multiIndexOf = (string, substring) => {
  var a=[],i=-1;
  while((i=string.indexOf(substring,i+1)) >= 0){
    a.push(i);
  }
  return a;
};

class LexerException {
  constructor(message){
    this.type = 'LexerException';
    this.message = message;
  }
}

let blockLexer = (bulletmark)=>{
  let tokenOutput = [];
  for(let block of bulletmark.trim().split(/(?:\s*\n){2,}/)){
    if(block.search(/^#{1,6} [\s\S]*/) > -1){
      // header
      // number: level, text
      tokenOutput.push(TOKEN.heading);
      let level = block.indexOf(' ');
      tokenOutput.push(level);
      tokenOutput.push(block.substring(level+1));
    // } else if(block.search(/^%+ [\s\S]*/) > -1){
    //   // ordered header
    //   // number: level, text
    //   tokenOutput.push(TOKEN.headingOrdered);
    //   let level = block.indexOf(' ');
    //   tokenOutput.push(level);
    //   tokenOutput.push(block.substring(level+1));
    // } else if(block.search(/^- [\s\S]*/) > -1){
    //   // list
    //   // text, text, ...
    //   tokenOutput.push(TOKEN.listBegin);
    //   tokenOutput = tokenOutput.concat(block.split(/\s*- /).slice(1));
    //   tokenOutput.push(TOKEN.listEnd);
    // } else if(block.search(/^\+ [\s\S]*/) > -1){
    //   // ordered list
    //   // text, text, ...
    //   tokenOutput.push(TOKEN.listBegin);
    //   tokenOutput = tokenOutput.concat(block.split(/\s*\+ /).slice(1));
    //   tokenOutput.push(TOKEN.listEnd);
    } else if(block.trim().search(/^!\[[\s\S]*\]$/) > -1){
      // image
      // url
      tokenOutput.push(TOKEN.image);
      tokenOutput.push(block.substring(block.indexOf('[')+1, block.indexOf(']')).trim());
    } else if(block.trim().search(/^{[\s\S]*}$/) > -1){
      // component
      let name = '';
      let props = 'none';
      let children = 'none';

      let k = block.trim().substring(1, block.length-1).trim();
      let indexFirstPipe = k.indexOf('|');
      if(indexFirstPipe > 0){
        name = k.substring(0, indexFirstPipe).trim();
        k = k.substring(indexFirstPipe+1).trim();

        let indexSecondPipe = k.indexOf('|');
        if(indexSecondPipe < 0){
          throw new LexerException(`Missing second pipe for ${block.trim()}`);
        }
        if(indexSecondPipe > 0){
          props = k.substring(0, indexSecondPipe).trim().split(/&&/).map((propval)=>{
            let indexOfEquals = propval.indexOf('=');
            if(indexOfEquals < 0){
              throw new LexerException(`Property ${propval} has no value`);
            }
            return [propval.substring(0, indexOfEquals).trim(), propval.substring(indexOfEquals+1).trim()];
          });
        }
        k = k.substring(indexSecondPipe+1).trim();
        if(k.length > 0){
          children = blockLexer(k);
        }
      } else {
        name = k.trim();
      }

      if
    } else {
      // paragraph
      // text, (... styled text), ...
      tokenOutput.push(TOKEN.paragraphBegin);
      let styleIndicies = multiIndexOf(block, '*').concat(multiIndexOf(block, '~')).concat(multiIndexOf(block, '_')).sort((a,b)=>{return a-b});
      let lastIndex = 0;
      let boldTrigger = false;
      let italicsTrigger = false;
      let underlineTrigger = false;
      for(let index of styleIndicies){
        if(index - lastIndex > 1){
          tokenOutput.push(block.substring(lastIndex+1, index));
        }
        lastIndex = index;
        switch(block.charAt(index)){
          case '*':
            if(boldTrigger){
              boldTrigger = false;
              tokenOutput.push(TOKEN.styleEnd);
            } else {
              boldTrigger = true;
              tokenOutput.push(TOKEN.styleBegin);
              tokenOutput.push(TOKEN.styleBold);
            }
            break;
          case '~':
            if(italicsTrigger){
              italicsTrigger = false;
              tokenOutput.push(TOKEN.styleEnd);
            } else {
              italicsTrigger = true;
              tokenOutput.push(TOKEN.styleBegin);
              tokenOutput.push(TOKEN.styleItalics);
            }
            break;
          case '_':
            if(underlineTrigger){
              underlineTrigger = false;
              tokenOutput.push(TOKEN.styleEnd);
            } else {
              underlineTrigger = true;
              tokenOutput.push(TOKEN.styleBegin);
              tokenOutput.push(TOKEN.styleUnderline);
            }
            break;
        }
      }
      if(block.length - lastIndex > 1){
        tokenOutput.push(block.substring(lastIndex+1));
      }
      tokenOutput.push(TOKEN.paragraphEnd);
    }
  }
  return tokenOutput;
};

let lexer = (bulletmark)=>{
  let tokenOutput = [];
  for(let section of bulletmark.trim().split(/(?:\s*\n){5,}/)){
    tokenOutput.push(TOKEN.sectionBegin);
    tokenOutput = tokenOutput.concat(blockLexer(section));
    tokenOutput.push(TOKEN.sectionEnd);
  }
};

let parser = (tokens)=>{
  for(let token of tokens){

  }
};