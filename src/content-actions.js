import * as addBaseTag from './actions/addBaseTag';
import * as addContent from './actions/addContent';
import * as addStyles from './actions/addStyles';
import * as addTitle from './actions/addTitle';
import * as removeInlineStyles from "./actions/removeInlineStyles";
import * as removeScripts from "./actions/removeScripts";


const modules = [
  addBaseTag,
  addContent,
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
