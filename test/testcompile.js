const {parser} = require('../lib');

const testbulletmark =
`
{ CustomComponent
  || prop1=val1;; prop2=val2;; prop3=val3;; ||
  { CustomChildComponent
    ||||
    # Heading

    this is some markdown
  }
}
`;

try{
  console.log('Hello');
} catch(err){
  console.log(err.type);
  console.log(err.message);
}
