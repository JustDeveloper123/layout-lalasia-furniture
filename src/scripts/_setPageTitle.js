const setPageTitle = function (title) {
  if (!title) title = 'Home';
  return (document.title = `Lalasia | ${title}`);
};

export default setPageTitle;
