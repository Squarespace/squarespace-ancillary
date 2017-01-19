Squarespace Ancillary
------------------------------

Ancillary is a layout script to move a set of "element" DOM nodes into a set of "container" DOM nodes based on a series of "setting" class names on the `<body>` element that describe positioning. It finds out about which DOM nodes are elements and which are containers through the presence of the data-attributes `data-nc-element` and `data-nc-container`. Ancillary can be instantiated many times on one page.

*NOTICE: This code is licensed to you pursuant to Squarespace’s Developer Terms of Use. See license section below.*

## Example

*Before Ancillary:*

```html
<body class="ancillary-header-logo-position-left ancillary-header-nav-position-right ancillary-header-cta-position-right">
  <header data-nc-base="header">
    <div data-nc-container="left">
      <h1 data-nc-element="logo"></h1>
      <nav data-nc-element="nav"></nav>
      <button data-nc-element="cta"></button>
    </div>
    <div data-nc-container="right"></div>
  </header>
</body>
```

*After Ancillary:*

```html
<body class="ancillary-header-logo-position-left ancillary-header-nav-position-right ancillary-header-cta-position-right">
  <header data-nc-base="header">
    <div data-nc-container="left">
      <h1 data-nc-element="logo"></h1>
    </div>
    <div data-nc-container="right">
      <nav data-nc-element="nav"></nav>
      <button data-nc-element="cta"></button>
    </div>
  </header>
</body>
```


## Usage

### Markup

Create an element to wrap all your Ancillary elements. This base element should have the data-attribute `data-nc-base`, and the attribute value should reflect the string that comes after 'ancillary' in the body class names.

```html
<header data-nc-base="header"></header>
```

Create container elements inside your base, and give them the data-attribute `data-nc-container`, with the value matching the string that comes after 'position' at the end of the body class names. NOTE: If a body class name refers to a container that is not present on the page as a `data-nc-container`, the corresponding element will be removed from the DOM. This can be useful – for example, a body class name of `ancillary-header-logo-position-none` will remove `<h1 data-nc-element="logo">` from the DOM entirely, as long as there is no `<div data-nc-container="none">` present in the DOM.

```html
<div data-nc-container="left"></div>
<div data-nc-container="right"></div>
```

Lastly, create the actual Ancillary elements and assign them the data-attribute `data-nc-element`, which should again match the strings that refer to the elements inside the body class names.

```html
<h1 data-nc-element="logo"></h1>
<nav data-nc-element="nav"></nav>
<button data-nc-element="cta"></button>
```

You've completed the process of creating your Ancillary layout. Feel free to put whatever you wish inside each `data-nc-element`.

### Javascript

```js
import Ancillary from '@squarespace/ancillary';

const header = document.querySelector('[data-nc-base="header"]');
const headerAncillary = new Ancillary(header);
headerAncillary.sync();
```

### Using ES6

If you prefer to handle transpiling and polyfilling on your own, you can import ES6 from Ancillary:

```js
import ancillary from '@squarespace/ancillary/src';
```

Alternately, Ancillary specifies a `module` property in `package.json` that points to the uncompiled `src/index.js`, so you may be able to simply import `@squarespace/ancillary` if you're using one of the following bundlers:
* [Webpack 2](https://webpack.js.org/configuration/resolve/#resolve-mainfields)
* [Rollup](https://github.com/rollup/rollup-plugin-node-resolve#rollup-plugin-node-resolve)


## Developer's Notes

* Ancillary is meant to solve a problem particular to Squarespace templates – the desire to allow users to achieve a large number of potential layouts for their desktop or mobile headers, without the ability to alter markup.
* Ancillary should _not_ be used on a normal website. Instead, just place the elements where they need to go in the markup.
* Ancillary is _not_ a standalone header module - you still need to create and style the content of the header elements yourself. It _only_ provides the ability to move elements around.

## License

Portions Copyright © 2016 Squarespace, Inc. This code is licensed to you pursuant to Squarespace’s Developer Terms of Use, available at http://developers.squarespace.com/developer-terms-of-use (the “Developer Terms”). You may only use this code on websites hosted by Squarespace, and in compliance with the Developer Terms. TO THE FULLEST EXTENT PERMITTED BY LAW, SQUARESPACE PROVIDES ITS CODE TO YOU ON AN “AS IS” BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.