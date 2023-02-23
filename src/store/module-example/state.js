export default function () {
  return {
    state: {
      matches: [],
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 1,
        rowsNumber: 0
      }
    }
  }
}
