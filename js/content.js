main();

function main() {
  const capitalInput = findCapitalInput(location);
  if (capitalInput != null) {
    capitalInput.focus();
  }
}

function findCapitalInput({ hostname, pathname }) {
  // Google Translate
  if (hostname == "translate.google.com" && pathname == "/")
    return $("#source");

  return null;
}
