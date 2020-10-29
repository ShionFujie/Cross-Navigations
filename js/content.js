focusInputOnSelectChange('typeMenuDiv')
focusInputOnSelectChange('matchMenuDiv')

document.onkeydown = event => {
  const { code, shiftKey, altKey, ctrlKey, metaKey } = event;
  if (code == "Slash" && !shiftKey) {
    focusCapitalInput();
    event.preventDefault();
    return;
  }
  const ti = getTabIndex(event)
  if (
    location.hostname == "www.wordhippo.com" &&
    code.startsWith("Digit") &&
    code[5] !== "0" &&
    !shiftKey &&
    !altKey &&
    !ctrlKey &&
    !metaKey
  ) {
    if (findCapitalInput(location).is(":focus")) return;
    navigateToWordHippoTab(parseInt(code[5]) - 1);
    return;
  }
  console.debug('active element is...')
  console.debug(document.activeElement)
  if (
    ti !== undefined &&
    location.hostname === "www.google.com" &&
    location.pathname === "/search" &&
    document.activeElement !== document.querySelector("input[name='q']")
  ) {
    console.debug(`Navigate to ${ti}th tab`);
    navigateToGoogleSearchTab(ti);
  }
};

function getTabIndex(event) {
  const { code, shiftKey, altKey, ctrlKey, metaKey } = event;
  if (code.startsWith("Digit") &&
    code[5] !== "0" &&
    !shiftKey &&
    !altKey &&
    !ctrlKey &&
    !metaKey)
    return parseInt(code[5]) - 1
  return undefined
}

function navigateToGoogleSearchTab(ti) {
  // The following algorithm can do its job when the currently selected tab is one of 'All', 'News',
  // 'Shopping', 'Videos', 'Books', 'Finance'. When 'Maps', 'Images', or 'Flights' is selected, the
  // page then either doesn't have tab menu at all or inflates it in a different markup.
  const items = document.querySelectorAll('#hdtb-msb-vis .hdtb-mitem.hdtb-imb')
  if (ti >= items.length) {
    console.debug(`there are ${items.length} tabs, but got index ${ti}`)
    return
  }
  const anchor = items[ti].querySelector('.q.qs')
  if (anchor === null) {
    console.debug('this tab is perhaps selected?')
    return
  }
  console.debug(`Navigate to URL '${anchor.href}'`)
  location = anchor.href
}

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
  if (hostname == "en.wiktionary.org") return $("input[type='search'][name='search']")

  return null;
}

function focusInputOnSelectChange(divId) {
  $(`div#${divId} select`).change(() => {
      $(`div#${divId} input[type='text']`).focus()
  })
}