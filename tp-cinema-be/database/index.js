const pg = require('pg');
const client = new pg.Client("pg://postgres:Qehu7112@localhost:5432/TP_Node");

client.connect()

module.exports = client;