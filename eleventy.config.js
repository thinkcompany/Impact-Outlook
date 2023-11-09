const { execSync } = require("child_process");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const browserslist = require("browserslist");
const sass = require("sass");
const { transform, browserslistToTargets } = require("lightningcss");
const path = require("path");
const esbuild = require("esbuild");

module.exports = function(eleventyConfig) {
	eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addTemplateFormats("js");
	eleventyConfig.addPassthroughCopy("src/assets");

	// Do Sass and Lightning CSS compilation
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			// Skip files starting with _
			if (parsed.name.startsWith("_")) {
				return;
			}

			// Run file content through Sass
			let result = sass.compileString(inputContent, {
				loadPaths: [parsed.dir || "."],
				sourceMap: false,
			});

			// Allow included files from @use or @import to
			this.addDependencies(inputPath, result.loadedUrls);

			let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

			// Run the CSS through Lightning CSS
			return async () => {
				let { code } = await transform({
					filename: 'style.css',
					code: Buffer.from(result.css),
					minify: true,
					sourceMap: false,
					targets,
				});
				return code;
			};
		},
	});

	eleventyConfig.addExtension('js', {
		outputFileExtension: 'js',
		compile: async (content, path) => {
			if (path !== './src/js/index.js') {
				return;
			}

			return async () => {
				let output = await esbuild.build({
					target: 'es2020',
					entryPoints: [path],
					minify: true,
					bundle: true,
					write: false,
				});

				return output.outputFiles[0].text;
			}
		}
	});

	// Watch targets
	eleventyConfig.addWatchTarget("src/assets/**/*.{svg,webp,png,jpeg}");
	eleventyConfig.addWatchTarget("/src/css/*.scss");
	eleventyConfig.addWatchTarget("/src/js/*.js");

	// Official plugins
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// Filters

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "src",          // default: "."
			includes: "_includes",  // default: "_includes"
			data: "_data",          // default: "_data"
			output: "_site"
		},
		pathPrefix: "/",
	};
};
