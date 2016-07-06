const TOKENS = {
  sectionBegin : 'SECTION_BEGIN',
  sectionEnd   : 'SECTION_END',
  codeBlock    : 'CODE_BLOCK',
  plaintext    : 'PLAINTEXT',
};

let sectionizer = (bulletmark)=>{
  return bulletmark.trim().split(/(\s*\n){5,}/);
};

let blockerizer = (bulletmark)=>{
  return bulletmark.trim().split(/(\s*\n){2,}/);
}

let lexer = (bulletmark)=>{
  let tokenOutput = [];
  for(section in sectionizer(bulletmark)){
    tokenOutput.push(TOKENS.sectionBegin);
    for(block in blockerizer(section)){
      block;
    }
    tokenOutput.push(TOKENS.sectionEnd);
  }
};
