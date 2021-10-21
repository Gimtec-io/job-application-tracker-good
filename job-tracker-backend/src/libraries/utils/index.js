// If we use a helper, the logic of preparing a text for slug is encapsulated
// Could also use a library for this
const slugify = (text) => text.replace(/ /g, '-').toLowerCase();

module.exports = {
  slugify,
};
