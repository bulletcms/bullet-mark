const TOKEN = {
  plaintext        : 'PLAINTEXT',
  sectionBegin     : 'SECTION_BEGIN',
  sectionEnd       : 'SECTION_END',
  codeBlock        : 'CODE_BLOCK',
  paragraphBegin   : 'PARAGRAPH_BEGIN',
  paragraphEnd     : 'PARAGRAPH_END',
  heading          : 'HEADING',
  headingOrdered   : 'HEADING_ORDERED',
  listBegin        : 'LIST_BEGIN',
  listEnd          : 'LIST_END',
  listOrderedBegin : 'LIST_ORDERED_BEGIN',
  listOrderedEnd   : 'LIST_ORDERED_END',
  image            : 'IMAGE',
  styleBegin       : 'STYLE_BEGIN',
  styleEnd         : 'STYLE_END',
  styleBold        : 'STYLE_BOLD',
  styleItalics     : 'STYLE_ITALICS',
  styleUnderline   : 'STYLE_UNDERLINE'
};

let multiIndexOf = (string, substring) => {
  var a=[],i=-1;
  while((i=string.indexOf(substring,i+1)) >= 0){
    a.push(i);
  }
  return a;
};

let lexer = (bulletmark)=>{
  let tokenOutput = [];
  for(section in bulletmark.trim().split(/(\s*\n){5,}/)){
    tokenOutput.push(TOKEN.sectionBegin);
    for(block in bulletmark.trim().split(/(\s*\n){2,}/)){
      if(block.search(/^#{1,6} [\s\S]*/) > -1){
        // header
        // number: level, text
        tokenOutput.push(TOKEN.heading);
        let level = block.indexOf(' ');
        tokenOutput.push(level);
        tokenOutput.push(block.substring(level+1));
      } else if(block.search(/^%+ [\s\S]*/) > -1){
        // ordered header
        // number: level, text
        tokenOutput.push(TOKEN.headingOrdered);
        let level = block.indexOf(' ');
        tokenOutput.push(level);
        tokenOutput.push(block.substring(level+1));
      } else if(block.search(/^- [\s\S]*/) > -1){
        // list
        // text, text, ...
        tokenOutput.push(TOKEN.listBegin);
        tokenOutput = tokenOutput.concat(block.split(/\s*- /).slice(1));
        tokenOutput.push(TOKEN.listEnd);
      } else if(block.search(/^\+ [\s\S]*/) > -1){
        // ordered list
        // text, text, ...
        tokenOutput.push(TOKEN.listBegin);
        tokenOutput = tokenOutput.concat(block.split(/\s*\+ /).slice(1));
        tokenOutput.push(TOKEN.listEnd);
      } else if(block.search(/^!\[[\s\S]*\]/) > -1){
        // image
        // url
        tokenOutput.push(TOKEN.image);
        tokenOutput.push(block.substring(block.indexOf('[')+1, block.indexOf(']')).trim());
      } else {
        // paragraph
        // text, (... styled text), ...
        tokenOutput.push(TOKEN.paragraphBegin);
        let styleIndicies = multiIndexOf(block, '*').concat(multiIndexOf(block, '~')).concat(multiIndexOf(block, '_')).sort((a,b)=>{return a-b});
        let lastIndex = 0;
        let boldTrigger = false;
        let italicsTrigger = false;
        let underlineTrigger = false;
        for(index in styleIndicies){
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
    tokenOutput.push(TOKEN.sectionEnd);
  }
};
