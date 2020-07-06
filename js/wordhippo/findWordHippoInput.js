function findWordHippoInput(pathname) {
  const pathsIds = [
    ["another-word-for", "anotherword", "synonymsMenuDiv"],
    ["the-opposite-of", "oppositeof", "antonymsMenuDiv"],
    ["the-meaning-of-the-word", "definitionword", "meaningMenuDiv"],
    ["words-that-rhyme-with", "rhymeword", "rhymeMenuDiv"],
    ["sentences-with-the-word", "sentenceword", "sentenceMenuDiv"],
    ["how-do-you-pronounce-the-word", "pronounceword", "pronounceMenuDiv"]
  ];
  for (let [path, inputId, divId] of pathsIds) {
    if (
      pathname.startsWith(`/what-is/${path}`) &&
      $(`#${divId}`).css("display") === "block"
    )
      return _withFocusHandler($(`input#${inputId}`));
  }

  const divIdsQueries = [
    ["translateMenuDiv", "textarea"],
    ["matchMenuDiv", "input[type='text']"],
    ["typeMenuDiv", "select#menuwordformtype"]
  ];
  for (let [divId, query] of divIdsQueries) {
    const div = $(`#${divId}`);
    if (div.css("display") === "block")
      return _withFocusHandler(div.find(query));
  }

  return null;
}

function _withFocusHandler(input) {
  return input.focus(() => {
    const inputEl = input.get(0);
    const textLength = inputEl.value.length;
    inputEl.setSelectionRange(textLength, textLength);
  });
}
