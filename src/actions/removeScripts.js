import { getNodes, removeNode } from "../utilities";

const removeScripts = (fragment) => {
  const scripts = getNodes('script', fragment);
  scripts.forEach(removeNode);
  return fragment;
};

const options = () => ({
  removeScripts: true,
});

const action = (options, document, fragment) => {
  if (options.removeScripts === true) {
    removeScripts(fragment);
  }
  return fragment;
};

export {
  action,
  options
}
