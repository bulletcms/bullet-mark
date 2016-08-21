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

  Some text after.

  Some more text after.
}
`;

console.log(parser(testbulletmark));
try{
} catch(err){
  console.log(err.type);
  console.log(err.message);
}
