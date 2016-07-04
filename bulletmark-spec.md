# Bulletmark Specification

###### v0.1.0




- [1. General](#1-general)
- [2. Layouts](#2-layouts)
  - [2.1 Paragraphs](#2.1-paragraphs)
  - [2.2 Sections](#2.2-sections)
  - [2.2 Headings](#2.3-headings)
- [3. Text styles](#3-text-styles)
- [4. Components](#5-components)




## 1. General




## 2. Layouts

Layouts define the semantics of how the content is displayed.

Some useful notes:

Paragraphs and headings are considered to be 1st order elements as they must be separated by at least one blank line. Sections are considered to be 0th order elements as they may compose multiple 1st order elements.


#### 2.1 Paragraphs

Paragraphs are delimited by at least a single line separation from surrounding content.

```
I am a paragraph.

Paragraphs can also have
hardbreaks where appropriate.

I am the third paragraph.
```


#### 2.2 Sections

Sections are delimited by at least a 4 line separation from surrounding content.

```
I am a part of the first section.

I am also a part of the first section.




This is the beginning of the next section.
```

Section delimitations take precedence over paragraphs.


#### 2.3 Headings

Headings begin with a `#` and are delimited by at least a single line separation from surrounding content. The number of `#`'s determine the level of the heading e.g. `#` would represent an `<h1>` and `######` would represent an `<h6>`. The `#`'s must be separated from their content by a single space.

Bulletmark also gives the option to have headings numbered, in which case the `%` is used instead. Ordered headings display a prefix numbered prefix to its heading text based on its level and ordering on the page. Ordered headings are also not limited to a depth of 6, but subsections beyond 6 should not be used often for the sake of clarity.

Unordered headings:

```
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

Ordered headings followed by their unordered heading equivalent:

```
% Heading
% Heading
%% Heading
%% Heading
% Heading
%% Heading
%%% Heading
%%%% Heading
```

```
## 1. Heading
## 2. Heading
### 2.1 Heading
### 2.2 Heading
## 3. Heading
### 3.1 Heading
#### 3.1.1 Heading
#### 3.1.1.1 Heading
```




## 3. Text styles




## 4. Components
