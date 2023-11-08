# argenx microsite

This repository is an Eleventy 11ty site, very loosely based on the [eleventy-base-blog v8 starter repository](https://github.com/11ty/eleventy-base-blog/tree/main). It has been stripped down for parts and customized to suit our needs.

[![Netlify Status](https://api.netlify.com/api/v1/badges/fdf1f348-022d-4ef6-92fe-7ca9f96b437f/deploy-status)](https://app.netlify.com/sites/argenx-microsite-aanem/deploys)


## Getting started
We are using assets as an NPM package from the argenx Storybook instance in this build, which requires an authorization step with GitHub:

### Create a new Personal Access Token (PAT) on Github

1. In Github, from your profile menu in the top right, Settings > Developer Settings > Personal Access Tokens

2. Generate a new token with a descriptive Note (ie ‘Token for Think Packages’)

3. Select the scopes: repo, read:packages, write:packages, and delete:packages

4. Generate the token and copy the token. Save this copied version somewhere.

### Authenticate yourself locally to Github packages

1. On your command line, run npm login --registry=https://npm.pkg.github.com

2. When prompted for your username, input your Github username

3. When prompted for your password, input the Personal Access Token you created previously.

* If you run into any issues, reference the [Github Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages)


### Clone Repository
1. Clone this Repository

```
git clone https://github.com/thinkcompany/argenx-aanem.git .
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

### Setup `pre-eleventy.js`
Pulls in variables and mixins from the argenx UI Library (node_modules/@thinkcompany/argenx-ui/dist/sass/settings), and drops them in the `css/ui-library` directory. The `child_procss` `execSync` is used to execute this in the `eleventy.config.js` file before `eleventyConfig` is executed.

### Config `eleventy.config.js`
* Handles sass compilation, browser-prefixing, and minification without external bundler. By declaring `eleventyConfig.addTemplateFormats("scss")`, 11ty now treats `scss` files like any other template and builds them mighty fast
* Sets watch targets for asset pipeline stuff
* PluginBundle to insert little bundles of code into templates
* Directory configuration

### Styles `src/css`
* Vars and mixins imported from the argenx UI Library are imported to `css/ui-library/`. These files should not be modified directly
* Add variables specific to this project to `src/css/_variables.scss`
* When adding partials, prefix file name with an underscore ie; `_forms.scss`
* Imported and authored partials are imported into `css/style.scss`
