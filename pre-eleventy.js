const fs = require('fs-extra');
const path = require('path');
const filePathSettings = "node_modules/@thinkcompany/argenx-ui/dist/sass/settings";
const filePathStyles = "node_modules/@thinkcompany/argenx-ui/dist/sass/src/styles/global/";
const outputVars = "src/css/ui-library/variables/";
const outputUtils = "src/css/ui-library/utils/";
const outputMixins = "src/css/ui-library/mixins/";
const outputStyles = "src/css/ui-library/";

const sourceFilesAndDirs = [
  {
    source: `${filePathSettings}/utils/_functions.scss`,
    destination: outputUtils
  },
  {
    source: `${filePathSettings}/variables/_borders-shadows.scss`,
    destination: outputVars
  },
  {
    source: `${filePathSettings}/variables/_breakpoints.scss`,
    destination: outputVars
  },
  {
    source: `${filePathSettings}/variables/_colors.scss`,
    destination: outputVars
  },
  {
    source: `${filePathSettings}/variables/_gradients.scss`,
    destination: outputVars
  },
  {
    source: `${filePathSettings}/variables/_spacing.scss`,
    destination: outputVars
  },
  {
    source: `${filePathSettings}/variables/_type.scss`,
    destination: outputVars
  },
  {
    source: `${filePathSettings}/mixins/_breakpoints.scss`,
    destination: outputMixins
  },
  {
    source: `${filePathSettings}/mixins/_buttons.scss`,
    destination: outputMixins
  },
  {
    source: `${filePathSettings}/mixins/_type.scss`,
    destination: outputMixins
  },
  {
    source: `${filePathStyles}_containers.scss`,
    destination: outputStyles
  },
  {
    source: `${filePathStyles}_type.scss`,
    destination: outputStyles
  }
];

// Loop through the array and copy the files/directories
sourceFilesAndDirs.forEach((entry) => {
  const { source, destination } = entry;

  // Ensure the destination directory exists
  fs.ensureDirSync(destination);

  // Copy the file/directory from node_modules to your src directory
  fs.copySync(source, `${destination}/${path.basename(source)}`);
});

console.log('Files and directories copied successfully.');