# Impact Outlook

Welcome to the Impact Outlook repository! Impact Outlook is built on the [Think Company Eleventy starter](https://github.com/thinkcompany/Eleventy-Starter), which is a minimalistic and efficient starter multipurpose repo designed to quickly build sites using the static site generator [Eleventy](https://www.11ty.dev/). Some features to streamline your Eleventy journey:

- Sass to CSS Processing: Write modular, maintainable CSS with Sass.
- CSS Transpilation with Lightning CSS: Enjoy modern CSS features and optimizations.
- JavaScript Bundling and Minification: Efficiently bundle and minify your JavaScript with esbuild.

This project leverages a canary version of Eleventy for ESM support.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ad54b302-e18d-4bf2-9c58-3893952296f8/deploy-status)](https://app.netlify.com/sites/dapper-cranachan-1d50b8/deploys)

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](project-structure)
- [Key Concepts](#key-concepts)
- [Other things to know](#other-things-to-know)
- [Other Resources](#other-resources)

---
## Getting Started

1. Make a directory and go there

```bash
mkdir impact-outlook
cd impact-outlook
```

2. Clone this repository

```bash
git clone https://github.com/thinkcompany/Impact-Outlook .
```

3. Install dependencies

```bash
npm install
```

4. Run Eleventy

Generate a production-ready build to the `dist` folder:

```bash
npm run build
```

Or build and spin up a local dev server at http://localhost:8080/

```bash
npm run dev
```
---

## Project Structure
**Basic Project Setup**

Out of the box, Eleventy provides a simple project structure...
```
├── .            # Main input directory (root of your project)
├── _data        # Global data files
├── _includes    # Template parts and layouts
└── _site        # Output directory for the built website
```

but it is entirely configurable. The structure of this project has been modified (see the return statement in `eleventy.config.js`)
```
return {
  dir: {
    input: "src",
    output: "_site",
    includes: "_includes",
  },
  ...
};
```

## Content
- Some site content is managed as front matter in `src/index.html`
- Card CTA text can be found at `src/_includes/components/cards.html`
- Footer paragraphs can be found at `src/_includes/footer.html`

## Deployment
This repo is configured to *automatically deploy to Netlify whenever a commit is merged into the `main` branch*. There are essentially 2 way to merge code into `main`, and therefore two options for deployment from local to production. Regardless, of your choice, ensure you have the latest code from Github:
```bash
git pull origin main
```

### 1. Pull Request Workflow
On your local machine, checkout a new branch. Replace `branch-name` with the name of your branch
```bash
git checkout -b branch-name
```
Before publishing your local work, it needs to be committed to the git repository. But first, it's never a bad idea do a git sanity check:
```bash
git status
```
You will see a list of files that have been modified, added, or deleted since the last commit. If a file has been changed that shouldn't have been, or you don't want to commit for whatever reason, in most cases you can run `git rm <filename>` to remove it. Git typically provides instructions following prompts, so keep an eye out for those.

If everything looks good and you are ready to create a pull request, add, commit, and push to github
```bash
  git add -A
  git commit -m "a commit message goes here"
  git push origin branch-name
```

Git will respond with a url you can follow to open the pull request in the Github gui, or head straight to the [Github PR screen](https://github.com/thinkcompany/Impact-Outlook/pulls) where you will see a UI element prompting you to create a pr.

From there you can add an optional message and hit the 'create pull request' button. Once created, git runs a check to see if the pr can be safely merged into the `main` branch. Once confirmed, a `merge` button becomes enabled. Smashing that button kicks off a deployment to production (Netlify).

Alternately, you can tag someone to review the code, or just save the pull request so that the work is backed-up (add a label so other know not to merge it).

### 2. Work directly on main (aka living on the edge)
Instead of creating a new branch when working locally, you can work directly on the `main` branch. The workflow is basically the same. Once your local work is ready, running the following will merge your local work into the remote repository (Github) *and* kick off a deployment to Netlify:

```bash
  git add -A
  git commit -m "a commit message goes here"
  git push origin main
```


## Eleventy - Key Concepts

### Templates
Files that define the structure and layout of your project. **Key features of templates:**

**Layouts**

Layouts in Eleventy are special templates used to wrap other content. In the context of this project, `_includes/layouts/base.html` is the main layout as it contains the "outer shell" HTML markup.
```

<!doctype html>
  <html lang="{{ metadata.language }}">
    ...
      <main class="site-main">
        {{ content | safe }}
      </main>
    ...
  </html>
```

**Data Binding and the Data Cascade**

Templates can output data from multiple sources, and is merged in order of priority:
1. [Computed Data](https://www.11ty.dev/docs/data-computed/) is processed at the end of the data cascade. Can be used to centralize repeated data. See how draft post functionality has been enabled in `eleventy.config.js` - search for "Computed Data"
2. [Front matter data](https://www.11ty.dev/docs/data-frontmatter/) in a template
3. [Template specifc data](https://www.11ty.dev/docs/data-template-dir/) files, for ex; a js or json file residing in /src/pagename/
4. [Directory data](https://www.11ty.dev/docs/data-template-dir/) files
5. [Front matter data in Layouts](https://www.11ty.dev/docs/layouts/#front-matter-data-in-layouts)
6. [Global config api data](https://www.11ty.dev/docs/data-global-custom/)
7. [Global data files](https://www.11ty.dev/docs/data-global/) are exposed to every Template. See how `_data/metadata.json` is used in `_includes/layouts/base.html`

**Collections**

Groups of content that can be output in templates. Declaring a Collection in `eleventy.config.js` enables a directory to be used as a collection. Otherwise, the collection must be declared in the front matter of each file using the keyword "tags".

**Tags**

Tags in Eleventy are not really taxonomy tags (but can be used as such)
```
layout: layouts/base.html
tags: tutorial
```

**Front Matter**

Meta data at the top of templates used for Eleventy specific configuration, for ex, defining a layout or permalink. Can also be used for project specifics like an SEO description, setting a variable to display conditional content, looping through items, or simply outputting some text.
```
---
layout: layouts/base.html
metaDescription: Please crawl my site
pageTitle: Why does this this site exist?
eleventyNavigation:
  key: about
  title: About
  order: 1
customBoolean: false
---

<h2>{{ pageTitle }}</h2>
{%- if customBoolean -%}
  <p>Conditional content</p>
{%- endif -%}

```

```
---
fruits:
  - Orange
  - Apple
  - Banana
  - Strawberry
---

<ul class="fruits">
  {%- for fruit in fruits -%}
    <li>{{ fruit }}</li>
  {%- endfor -%}
</ul>
```

**Filters**

Filters allow you to do stuff to content and output it in templates. Add filters in `eleventy.config.js`.
```
// eleventy.config.js
eleventyConfig.addAsyncFilter("makeUppercase", async (value) => `${value.toUpperCase()}`);

// Usage
{{ "Hello, World!" | makeUppercase }}
```

**Shortcodes**

Output reusable content in templates. Fetch data with [async shortcodes](https://davidea.st/articles/11ty-tips-i-wish-i-knew-from-the-start/#6-async-shortcodes-are-for-dynamic-data-fetching)
```
// eleventy.config.js
eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
// Usage: {% year %}
```
---

# Other Things to Know
**Official Plugins**

[Plugins](https://www.11ty.dev/docs/plugins/) are custom code that Eleventy imports into the project. Official plugins are prefixed with `@11ty/` on NPM. The navigation in this repo is using the `'@11ty/eleventy-navigation'` plugin.

**Debugging**

`npm run debug` executes `DEBUG=Eleventy* npx @11ty/eleventy`

**Supplied Data**

Eleventy comes with data values that can be useful for debugging, or for use in a template. Use the `log` utility to view data in the console Data objects are `pkg`, `page`, `pagination`, `collections`, and `eleventy`. Usage "pkg | log"

**Demo build step**

The *source of truth* README lives in the root, as expected. `npm run copy-readme` copies that readme file into the `src/` directory as a markdown file, and adds front matter data so the page will render in the navigation. This exists only as a way to demo the readme as an 11ty page without manual duplication.

This build step, `npm run copy-readme` is combined with `npm run build` in `package.json`.

---

## Resources
**Eleventy Resources**
- [Template](https://www.11ty.dev/docs/templates/)
- [Data](https://www.11ty.dev/docs/data/)
- [Filters](https://www.11ty.dev/docs/filters/)
- [Shortcodes](https://www.11ty.dev/docs/shortcodes/)
- [Collections](https://www.11ty.dev/docs/collections/)
- [Github](https://github.com/11ty/eleventy)
- [Debugging in Eleventy](https://www.11ty.dev/docs/debugging/)
- [Eleventy Supplied Data](https://www.11ty.dev/docs/data-eleventy-supplied/)


**11ty Community**
- [11ty Rocks!](https://11ty.rocks)
- [Architecting data in Eleventy](https://sia.codes/posts/architecting-data-in-eleventy/)
- [Templating in Eleventy](https://cloudcannon.com/tutorials/eleventy-beginner-tutorial/templating-in-eleventy/)
- [I Finally Understand Eleventy's Data Cascade](https://benmyers.dev/blog/eleventy-data-cascade/)

- [Deploy to Netlify](https://docs.netlify.com/frameworks/eleventy/)