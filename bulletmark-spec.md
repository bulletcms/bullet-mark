# Bulletmark Specification

###### v0.1.0




- [1. General](#1-general)
- [2. Layouts](#2-layouts)
  - [2.1 Paragraphs](#21-paragraphs)
  - [2.2 Sections](#22-sections)
  - [2.3 Headings](#23-headings)
  - [2.4 Lists](#24-lists)
  - [2.5 Code blocks](#25-code-blocks)
- [3. Text styles](#3-text-styles)
  - [3.1 Decoration](#31-decoration)
- [4. Components](#4-components)




## 1. General




## 2. Layouts

Layouts define the semantics of how the content is displayed.

Some useful notes:

Paragraphs and headings are considered to be 1st order elements as they must be separated by at least one blank line. Sections are considered to be 0th order elements as they may compose multiple 1st order elements.


### 2.1 Paragraphs

Paragraphs are delimited by at least a single line separation from surrounding content.

```
I am a paragraph.

Paragraphs can also have
hardbreaks where appropriate.

I am the third paragraph.
```


### 2.2 Sections

Sections are delimited by at least a 4 line separation from surrounding content.

```
I am a part of the first section.

I am also a part of the first section.




This is the beginning of the next section.
```

Section delimitations take precedence over paragraphs.


### 2.3 Headings

Headings begin with a `#` and are delimited by at least a single line separation from surrounding content. The number of `#`'s determine the level of the heading e.g. `#` would represent an `<h1>` and `######` would represent an `<h6>`. The `#`'s must be separated from their content by a single space.

Bulletmark also gives the option to have headings numbered, in which case the `%` is used instead. Ordered headings display a prefix numbered prefix to its heading text based on its level and ordering on the page. Ordered headings are also not limited to a depth of 6, but subsections beyond 6 should not be used often for the sake of clarity. The heading style applied to an ordered heading is equal to the (ordered heading's level + 1). The heading style applied also does not exceed a maximum level of 5 for the sake of legibility.

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
%%%%% Heading
```

```
## 1. Heading
## 2. Heading
### 2.1 Heading
### 2.2 Heading
## 3. Heading
### 3.1 Heading
#### 3.1.1 Heading
##### 3.1.1.1 Heading
##### 3.1.1.1.1 Heading
```


### 2.4 Lists

Lists come in the unordered and ordered varieties. Unordered lists prefix each item with a `-`. Ordered lists prefix each item with a `+`.

Lists are a 1st order element. As a result each item in the list must be on the next new line. The list itself must be delimited by a blank line above and below.

```
- This
- is
- an
- unordered
- list

- This
- is
- yet
- another

+ This
+ list
+ is
+ ordered
```


### 2.5 Code blocks

Code blocks are 0th order elements delimited by triple `` ` ``'s.

```
Such as this one.
```




## 3. Text styles

### 3.1 Decoration

Text may be underlined, italicized, and emboldened.

Respectively, text with these appropriate styles should be delimited by `_`, `~`, and `*`.

These characters can also be escaped using a `\`.

```
I am _underlined_, ~italicized~, and *emboldened*.

But not \~me\~.
```


### 3.2 Links

Links take the form of `[display text | www.example.com]`.

```
This is a link to [Google | www.google.com].
```


### 3.3 Images

Images take the form of `[! www.example.com]`.

```
This is an image: [! /material.google.com/static/images/nav_google_logo.svg].
```




## 4. Components

Components convert to jsx components.
