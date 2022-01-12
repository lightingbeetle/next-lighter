import fs from "fs";
import * as docgen from "react-docgen-typescript";

// This plugin expects that every comonent has stated displayName and that component name and displayName is same - otheviews no __docgenInfo will be injected
//TODO: Make this plugin into own npm pacakge
//FIXME: Usage of React.ComponentProps (eg. React.ComponentProps<'div'>) makes react-docgen return empty component docgen info. Import of ComponentProps (eg. ComponentProps<'div'>) fixes this issue - it's probably react-docgen-typescript issue.
const plugin = function esbuildReactDocgenTypescriptPlugin() {
  return {
    name: "esbuild-react-docgen-typescript",
    setup(build) {
      // TODO: filter path should by a parameter of this plugin
      const filter = /.*\/components\/src\/components\/.*\.tsx?$/;

      build.onLoad({ filter }, (args) => {
        const fileContents = fs.readFileSync(args.path, "utf8");

        // Parse file for docgen info
        const docgenInfo = docgen.parse(args.path, {
          // filter props which comes from npm packages, because we don't want to display all props of components using for example React.ComponentProps<'div'>
          // TODO: this could have include/exclude for more control
          propFilter: (prop) => {
            if (
              prop.declarations !== undefined &&
              prop.declarations.length > 0
            ) {
              const hasPropAdditionalDescription = prop.declarations.find(
                (declaration) => {
                  return !declaration.fileName.includes("node_modules");
                }
              );

              return Boolean(hasPropAdditionalDescription);
            }

            return true;
          },
          // see react-docgen-typescript options
          shouldExtractLiteralValuesFromEnum: true,
          shouldExtractValuesFromUnion: true,
        });

        const docgenInfoContents = docgenInfo
          .map((docgenInfoItem) => {
            // react-docgen parses also files which are re-exporting components like index files and are able to get get docs there too. But since in this files components are not defined we can't inject __docgenInfo on them there. So we checking for displayName property which tell as component is defined in that file.
            // TODO: find better heurestics to identify files with component definition
            const hasReactComponent = fileContents.includes(
              `${docgenInfoItem.displayName}.displayName`
            );

            // inject __docgenInfo
            return hasReactComponent
              ? `${docgenInfoItem.displayName}.__docgenInfo = ${JSON.stringify(
                  docgenInfoItem
                )};`
              : "";
          })
          .join("\n");

        return {
          // add __docgenInfo at the end of the file
          contents: fileContents + docgenInfoContents,
          loader: "tsx",
        };
      });
    },
  };
};

export default plugin;
