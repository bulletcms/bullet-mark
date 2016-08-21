import React from 'react';

const h = React.createElement;

const interpreter = (bulletjson, views)=>{
  if(typeof bulletjson === 'string'){
    // use remarkable to output html
  }

  if(!Array.isArray(bulletjson)){
    // interpret component
    const {component, props, children} = bulletjson;
    if(views[component]){
      return h(views[component], props, interpreter(children, views));
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
