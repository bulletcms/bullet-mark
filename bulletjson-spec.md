# Bulletjson Specification

###### v0.1.0

Bulletjson defines all terms as a recursive tree of components which are represented by objects.




## Definitions:


### Object

```
{
  component: NameOfComponent,
  props: {
    prop1: val1,
    prop2: val2,
    prop3: val3
  },
  children: [
    ...
  ]
}
```


### Example

```
[
  {
    component: section,
    children: [
      {
        component: CustomComponent,
        props: {
          prop1: val1,
          prop2: val2,
          prop3: val3
        }
      }
    ]
  },
  {
    component: p,
    children: [
      Hello World!
    ]
  }
]
```
