import React from 'react';
import Remarkable from 'remarkable';

const h = React.createElement;
const md = new Remarkable('commonmark');

const interpreter = (bulletjson, views)=>{
  if(typeof bulletjson === 'string'){
    return h('div', {
      // explicitly trust remarkable, nothing else
      dangerouslySetInnerHTML: {
        __html: md.render()
      }
    });
  }

  if(!Array.isArray(bulletjson)){
    // interpret component
    const {component, props, children} = bulletjson;
    if(views[component]){
      if(props){
        if(children){
          return h(views[component], props, interpreter(children, views));
        } else {
          return h(views[component], props);
        }
      } else {
        if(children){
          return h(views[component], null, interpreter(children, views));
        }
      }
    } else {
      return '';
    }
  }

  // interpret array
  const viewjson = [];
  for(let i of bulletjson){
    viewjson.push(interpreter(i, views));
  }
  return viewjson;
};

export {interpreter};
