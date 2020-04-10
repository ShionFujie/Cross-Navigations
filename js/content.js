main();

function main() {
  const capitalInput = findCapitalInput(location);
  if (capitalInput != null) {
    capitalInput.focus();
  }
}

function findCapitalInput({ hostname, pathname }) {
  // YouTube
  if (hostname == "www.youtube.com" && ["/", "/watch"].includes(pathname))
    return $("input#search");

  // Google Translate
  if (hostname == "translate.google.com" && pathname == "/")
    return $("#source");

  if (hostname == "www.thesaurus.com") return $("input[type='search']");

  return null;
}
