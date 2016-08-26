import React from 'react';
import Remarkable from 'remarkable';

const h = React.createElement;
const md = new Remarkable('commonmark');

const interpreter = (bulletjson, views, keyed=false)=>{
  if(typeof bulletjson === 'string'){
    let props = {
      // explicitly trust remarkable, nothing else
      dangerouslySetInnerHTML: {
        __html: md.render(bulletjson)
      }
    };
    if(keyed){
      props.key = hashCode(bulletjson);
    }
    return h('div', props);
  }

  if(!Array.isArray(bulletjson)){
    // interpret component
    let {component, props, children} = bulletjson;
    if(views[component]){
      if(!props){
        props = {};
      }
      if(keyed){
        props.key = hashCode(JSON.stringify(bulletjson));
      }
      if(!children){
        return h(views[component], props);
      }
      return h(views[component], props, interpreter(children, views));
    } else {
      return '';
    }
  }

  // interpret array
  const viewjson = [];
  for(let i of bulletjson){
    viewjson.push(interpreter(i, views, true));
  }
  return viewjson;
};

export {interpreter};
