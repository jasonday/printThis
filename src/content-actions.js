import * as addBaseTag from './actions/addBaseTag';
import * as addStyles from './actions/addStyles';
import * as addTitle from './actions/addTitle';
import * as removeInlineStyles from "./actions/removeInlineStyles";
import * as removeScripts from "./actions/removeScripts";


const modules = [
  addBaseTag,
  addStyles,
  addTitle,
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
