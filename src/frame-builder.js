import * as util from "./utilities";

const makeIEFrame = (frame) => {
  // Ugly IE hacks due to IE not inheriting document.domain from parent
  // checks if document.domain is set by comparing the host name against document.domain
  var iframeSrc = `javascript:document.write("<head><${"script"}>document.domain=\\"${
    document.domain
  }\\";</${"script"}></head><body></body>")`;

  frame.className = "MSIE";
  frame.src = iframeSrc;
};

const makeFrame = () => {
  const frameName = "printThis-" + util.getNow();
  const frame = document.createElement("iframe");
  frame.name = "printIframe";
  frame.id = frameName;

  if (util.isOldIE()) {
    makeIEFrame(frame);
  }

  document.body.appendChild(frame);
  return frame;
};

export { makeFrame };
