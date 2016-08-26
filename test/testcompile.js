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



const testbulletjson = [
  {
    'component': 'PageHeader',
    'children': 'Article View'
  },
  {
    'component': 'Article',
    'props': {
      'title': 'Article Title',
      'author': 'Kevin Wang',
      'date': 1471759742287
    },
    'children': [
      {
        'component': 'p',
        'children': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut aliquet nunc. Maecenas commodo libero arcu, vitae ultrices quam iaculis vitae. Nulla eros purus, auctor sed laoreet in, pharetra eget mi. Phasellus molestie id odio eu mollis. Proin nec tellus et lectus suscipit cursus quis eget eros. Nunc interdum lacus elit, id gravida ligula placerat eu. Nullam hendrerit iaculis lorem, nec scelerisque turpis pretium ac. Morbi blandit dolor massa, cursus lobortis eros malesuada ut. Sed semper ullamcorper gravida. Integer at diam urna. In ligula tortor, egestas nec dictum eu, suscipit vitae mauris. Sed imperdiet sit amet massa at fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
      },
      {
        'component': 'p',
        'children': 'Maecenas vulputate nec mi non posuere. Vestibulum malesuada erat justo, at aliquet enim posuere vestibulum. Ut viverra porta est, eu semper lacus euismod et. Curabitur elementum vestibulum nisi imperdiet ornare. Nulla lobortis mi eu dictum viverra. Donec rhoncus, tortor vitae lobortis fringilla, eros nibh malesuada erat, faucibus condimentum risus urna ut elit. Phasellus non ullamcorper lectus, eu rutrum risus. Nullam convallis scelerisque justo ac sollicitudin. Duis nisi arcu, condimentum non eros in, rutrum mollis urna. Integer elit orci, rhoncus sit amet rutrum vitae, ullamcorper ut leo. Donec ut tempus eros.'
      }
    ]
  }
];

try{
  // console.log(JSON.stringify(parser(testbulletmark), null, 2));
  console.log(ReactDOMServer.renderToString(h('div', null, interpreter(testbulletjson, views))));
} catch(err){
  console.log(err.type);
  console.log(err.message);
}
