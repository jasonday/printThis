import * as removeInlineStyles from "./actions/removeInlineStyles";
import * as removeScripts from "./actions/removeScripts";

const modules = [
  removeInlineStyles,
  removeScripts,
];

const buildOptions = modules.reduce((options, module) => ({
  ...options,
  ...modules.options(),
}), {});

export {
  buildOptions,
  modules,
};
