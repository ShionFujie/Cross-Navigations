document.onkeydown = event => {
  const {code, shiftKey} = event
  if (code == "Slash" && !shiftKey) {
    focusCapitalInput();
    event.preventDefault()
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

  return null;
}
