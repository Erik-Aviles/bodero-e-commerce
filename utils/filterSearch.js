const filterSearch = ({ router, category, sort, search, searchCode }) => {
  const path = router.pathname;
  const query = router.query;

  if (category) query.category = category;
  if (search) query.search = search;
  if (searchCode) query.searchCode = searchCode;
  if (sort) query.sort = sort;

  router.push({
    pathname: path,
    query: query,
  });
};

export default filterSearch;
