const {parser, interpreter} = require('../lib');

const testbulletmark =
`
hello world!

{ CustomComponent
  || prop1=val1;; prop2=val2;; prop3=val3;; ||
  { CustomChildComponent
    ||||
    # Heading

    this is some markdown
  }

  Some text after.

  Some more text after.

  { NextChildComponent
    || secretprop = secret;; ||
  }
}
`;

try{
  // console.log(JSON.stringify(parser(testbulletmark), null, 2));
} catch(err){
  console.log(err.type);
  console.log(err.message);
}
