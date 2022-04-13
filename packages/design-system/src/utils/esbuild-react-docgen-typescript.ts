import fs from "fs";
import * as docgen from "react-docgen-typescript";

// generationg docgenInfo is expansive. But there is no detection for file changes there for no invalidation is possible - docgenInfo will stay same during runtime
const docgenInfoCache = new Map();

// This plugin expects that every comonent has stated displayName and that component name and displayName is same - otheviews no __docgenInfo will be injected
//TODO: Make this plugin into own npm pacakge
//FIXME: Usage of React.ComponentProps (eg. React.ComponentProps<'div'>) makes react-docgen return empty component docgen info. Import of ComponentProps (eg. ComponentProps<'div'>) fixes this issue - it's probably react-docgen-typescript issue.
const esbuildReactDocgenTypescriptPlugin =
  function esbuildReactDocgenTypescriptPlugin({
    baseName = "",
  }: {
    /** Helps to filter paths without baseName of component to speed up docgen compilation */
    baseName?: string;
  }) {
    return {
      name: "esbuild-react-docgen-typescript",
      setup(build: any) {
        // TODO: filter path should by a parameter of this plugin
        const filter = new RegExp(
          `.*[/\\\\]src[/\\\\]components[/\\\\]${baseName}.*\.tsx?$`
        );

        build.onLoad({ filter }, (args: any) => {
          const fileContents = fs.readFileSync(args.path, "utf8");

          const customCompilerOptionsParser = docgen.withCompilerOptions(
            {
              esModuleInterop: false,
              exclude: ["node_modules"],
              noEmit: true,
            },
            {
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
            }
          );

          let docgenInfo: docgen.ComponentDoc[] = docgenInfoCache.get(
            args.path
          );

          if (!docgenInfo) {
            // FIXME: this is painfully slow right know - on windows only?
            docgenInfo = customCompilerOptionsParser.parse(args.path);

            docgenInfoCache.set(args.path, docgenInfo);
          }

          const docgenInfoContents = docgenInfo
            .map((docgenInfoItem) => {
              // react-docgen parses also files which are re-exporting components like index files and are able to get get docs there too. But since in this files components are not defined we can't inject __docgenInfo on them there. So we checking for displayName property which tell as component is defined in that file.
              // TODO: find better heurestics to identify files with component definition
              const hasReactComponent = fileContents.includes(
                `${docgenInfoItem.displayName}.displayName`
              );

              // inject __docgenInfo
              return hasReactComponent
                ? `${
                    docgenInfoItem.displayName
                  }.__docgenInfo = ${JSON.stringify(docgenInfoItem)};`
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

export default esbuildReactDocgenTypescriptPlugin;
