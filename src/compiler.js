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
  image            : 'IMAGE'
};


let lexer = (bulletmark)=>{
  let tokenOutput = [];
  for(section in bulletmark.trim().split(/(\s*\n){5,}/)){
    tokenOutput.push(TOKEN.sectionBegin);
    for(block in bulletmark.trim().split(/(\s*\n){2,}/)){
      if(block.match(/^#{1,6} [\s\S]*/)){
        // header
        // number: level, text
        tokenOutput.push(TOKEN.heading);
        let level = block.indexOf(' ');
        tokenOutput.push(level);
        tokenOutput.push(block.substring(level+1));
      } else if(block.match(/^%+ [\s\S]*/)){
        // ordered header
        // number: level, text
        tokenOutput.push(TOKEN.headingOrdered);
        let level = block.indexOf(' ');
        tokenOutput.push(level);
        tokenOutput.push(block.substring(level+1));
      } else if(block.match(/^- [\s\S]*/)){
        // list
        // text, text, ...
        tokenOutput.push(TOKEN.listBegin);
        tokenOutput = tokenOutput.concat(block.split(/\s*- /).slice(1));
        tokenOutput.push(TOKEN.listEnd);
      } else if(block.match(/^\+ [\s\S]*/)){
        // ordered list
        // text, text, ...
        tokenOutput.push(TOKEN.listBegin);
        tokenOutput = tokenOutput.concat(block.split(/\s*\+ /).slice(1));
        tokenOutput.push(TOKEN.listEnd);
      } else if(block.match(/^!\[[\s\S]*\]/)){
        // image
        // url
        tokenOutput.push(TOKEN.image);
        tokenOutput.push(block.substring(block.indexOf('[')+1, block.indexOf(']')).trim());
      } else {
        // paragraph
      }
    }
    tokenOutput.push(TOKEN.sectionEnd);
  }
};
