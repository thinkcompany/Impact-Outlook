# Impact Outlook

This repository is an Eleventy 11ty site, very loosely based on the [eleventy-base-blog v8 starter repository](https://github.com/11ty/eleventy-base-blog/tree/main). It has been stripped down for parts and customized to suit our needs.


## Getting started

### Clone Repository
1. Clone this Repository

```
git clone https://github.com/thinkcompany/Impact-Outlook.git .
```

2. Install dependencies

```
npm install
```

3. Start up a local dev server

```
npm start
```

Or you can run [debug mode](https://www.11ty.dev/docs/debugging/) to see all the internals.
```
npm debug
```

## Things to know

### NPM commands
* `build` builds the output directory `_site`
* `start` fires up the dev server (and runs `build`)
* `debug`

### Config `eleventy.config.js`
* Handles sass compilation, browser-prefixing, and minification without external bundler. By declaring `eleventyConfig.addTemplateFormats("scss")`, 11ty now treats `scss` files like any other template and builds them mighty fast
* Sets watch targets for asset pipeline stuff
* PluginBundle to insert little bundles of code into templates
* Directory configuration
