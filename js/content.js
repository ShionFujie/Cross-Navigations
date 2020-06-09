document.onkeydown = event => {
  const { code, shiftKey } = event;
  if (code == "Slash" && !shiftKey) {
    focusCapitalInput();
    event.preventDefault();
    return;
  }
  if (
    location.hostname == "www.wordhippo.com" &&
    code.startsWith("Digit") &&
    code[5] !== "0"
  ) {
    if (findCapitalInput(location).is(":focus")) return 
    navigateToWordHippoTab(parseInt(code[5]) - 1);
    return;
  }
};

function focusCapitalInput() {
  capitalInput = findCapitalInput(location);
  if (capitalInput != null) {
    capitalInput.focus();
  }
}

function findCapitalInput({ hostname, pathname }) {
  if (hostname == "www.thesaurus.com") return $("input[type='search']");
  if (hostname == "www.google.com" && pathname == "/search")
    return $("input[name='q']");
  if (hostname == "www.wordhippo.com") return findWordHippoInput(pathname);

  return null;
}
