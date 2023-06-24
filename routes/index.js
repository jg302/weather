const nodeRoutes = require('./readings');

module.exports = function(app, db) {  nodeRoutes(app, db) };