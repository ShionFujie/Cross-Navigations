document.onkeydown = event => {
  const { code, shiftKey, altKey } = event;
  if (code == "Slash" && !shiftKey) {
    focusCapitalInput();
    event.preventDefault();
    return;
  }
  if (code.startsWith("Digit") && shiftKey && altKey && code[5] !== "0") {
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

function navigateToWordHippoTab(index) {
  const menuoption = $(`div[class^="menuoption"]:eq(${index})`);
  const clickable = menuoption.attr("onclick")
    ? menuoption
    : menuoption.find("a").get(0);
  clickable.click();
}

function findCapitalInput({ hostname, pathname }) {
  if (hostname == "www.thesaurus.com") return $("input[type='search']");
  if (hostname == "www.google.com" && pathname == "/search")
    return $("input[name='q']");
  if (hostname == "www.wordhippo.com") return findWordHippoInput(pathname);

  return null;
}
