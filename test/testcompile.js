const {parser, interpreter} = require('../lib');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const h = React.createElement;

class Article extends React.Component{
  /**
   * props:
   *   title: string
   *   author: string
   *   date: unixtime
   */
  render(){
    return h('article', null, [
      h('h2', null, [
        this.props.title,
        h('small', null, this.props.author)
      ]),
      this.props.children
    ]);
  }
}

class PageHeader extends React.Component{
  /**
   * props:
   *   title: string
   */
  render(){
    return h('div', {className: 'page-header'}, [
      h('h1', null, this.props.children)
    ]);
  }
}

const views = {Article, PageHeader};

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
  console.log(JSON.stringify(parser(testbulletmark), null, 2));
} catch(err){
  console.log(err.type);
  console.log(err.message);
}
