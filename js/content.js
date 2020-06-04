document.onkeydown = event => {
  const { code, shiftKey } = event;
  if (code == "Slash" && !shiftKey) {
    focusCapitalInput();
    event.preventDefault();
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
  if (hostname == "www.wordhippo.com") {
    const pathsIdsTable = {
      "another-word-for": "anotherword",
      "the-opposite-of": "oppositeof",
      "the-meaning-of-the-word": "definitionword",
      "words-that-rhyme-with": "rhymeword",
      "sentences-with-the-word": "sentenceword",
      "how-do-you-pronounce-the-word": "pronounceword"
    };
    for (let [path, id] of Object.entries(pathsIdsTable)) {
      if (pathname.startsWith(`/what-is/${path}`))
        return $(`input#${id}`)
    }

    return $("input#wordformword");
  }

  return null;
}
