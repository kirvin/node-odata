function _countQuery(model, { count, filter }) {
  return new Promise((resolve, reject) => {
    model.count(filter)
      .then((rows) => {
        console.log(rows);
        resolve({ '@odata.count': 0 })
      }).catch((err) => reject({ status: 500, text: err }));
  });
}

function _dataQuery(model, { count, filter }) {
  return model.list(filter)
    .catch((err) => reject({ status: 500, text: err }))
}

export default (req, RepositoryModel, options) => new Promise((resolve, reject) => {
  const params = {
    count: req.query.$count,
    filter: req.query.$filter,
    orderby: req.query.$orderby,
    skip: req.query.$skip,
    top: req.query.$top,
    select: req.query.$select,
    // TODO expand: req.query.$expand,
    // TODO search: req.query.$search,
  };

  Promise.all([
    _countQuery(RepositoryModel, params),
    _dataQuery(RepositoryModel, params, options),
  ]).then((results) => {
    const entity = results.reduce((current, next) => ({ ...current, ...next }));
    resolve({ entity });
  }).catch((err) => reject({ status: 500, text: err }));
});
