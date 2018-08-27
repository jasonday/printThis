function isOldIE() {
  const isBrowser = typeof navigator !== "undefined";

  if (!isBrowser) {
    return false;
  }

  return /msie/i.test(navigator.userAgent);
}

function getNow() {
  return isOldIE() ? new Date().getTime() : Date.now();
}

export { getNow, isOldIE };
