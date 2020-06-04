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
      "another-word-for": ["anotherword", "synonymsMenuDiv"],
      "the-opposite-of": ["oppositeof", "antonymsMenuDiv"],
      "the-meaning-of-the-word": ["definitionword", "meaningMenuDiv"],
      "words-that-rhyme-with": ["rhymeword", "rhymeMenuDiv"],
      "sentences-with-the-word": ["sentenceword", "sentenceMenuDiv"],
      "how-do-you-pronounce-the-word": ["pronounceword", "pronounceMenuDiv"]
    };
    for (let [path, [inputId, divId]] of Object.entries(pathsIdsTable)) {
      if (
        pathname.startsWith(`/what-is/${path}`) &&
        $(`#${divId}`).css("display") === "block"
      )
        return $(`input#${inputId}`);
    }

    const divIdsQueries = [
      ["translateMenuDiv", "textarea"],
      ["matchMenuDiv", "input[type='text']"],
      ["typeMenuDiv", "input[type='text']"]
    ];
    for (let [divId, query] of divIdsQueries) {
      const div = $(`#${divId}[style*='display: block']`);
      if (div.length > 0) return div.find(query);
    }

    return null;
  }

  return null;
}
