function navigateToWordHippoTab(index) {
  const menuoption = $(`div[class^="menuoption"]:eq(${index})`);
  const clickable = menuoption.attr("onclick")
    ? menuoption
    : menuoption.find("a").get(0);
  clickable.click();
}
