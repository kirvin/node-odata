export default (req, model) => new Promise((resolve, reject) => {
  model.findById(req.params.id, (err, entity) => {
    if (err) {
      return reject(err);
    }

    if (!entity) {
      return reject({ status: 404 }, { text: 'Not Found' });
    }

    return resolve({ entity });
  });
});
