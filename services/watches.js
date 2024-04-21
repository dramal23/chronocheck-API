const db = require('../services/db');
const config = require('../config');

function getMultiple(page = 1) 
{
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM watches LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function getBrandName(page = 1) 
{
    const offset = (page - 1) * config.listPerPage;
    const data = db.query(`SELECT DISTINCT brand_name FROM watches LIMIT ?,?`, [offset, config.listPerPage]);
    const meta = {page};
  
    return {
      data,
      meta
    }
  }

module.exports = {
  getMultiple,
  getBrandName
}