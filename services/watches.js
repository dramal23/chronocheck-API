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

function getBrandInfos(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`
      SELECT watches.brand_name, CAST(AVG(watches.price) AS INT) AS avg_price,
      GROUP_CONCAT(price_history.price) AS price_history
      FROM watches
      LEFT JOIN price_history ON watches.id = price_history.watch_id
      WHERE watches.brand_name = ?
      GROUP BY watches.brand_name
  `, [offset, config.listPerPage]);
  const meta = { page };

  return {
      data,
      meta
  };
}

module.exports = {
  getMultiple,
  getBrandName,
  getBrandInfos
}