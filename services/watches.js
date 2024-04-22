const db = require('../services/db');
const config = require('../config');

function getMultiple() 
{
  const data = db.query(`SELECT * FROM watches GROUP BY model_name` , []);

  return {
    data,
  };
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

function getBrandInfos() 
{
  const data = db.query(`
    SELECT watches.brand_name, 
           CAST(AVG(watches.price) AS INT) AS avg_price,
           GROUP_CONCAT(price_history.price) AS price_history,
           brand_logos.logo_url AS logo_url
    FROM watches
    LEFT JOIN price_history ON watches.id = price_history.watch_id
    LEFT JOIN brand_logos ON watches.brand_name = brand_logos.brand_name
    GROUP BY watches.brand_name;
  `, []);

  return {
      data
  };
}

function getWatchDetails(watchModel) {
  const rawData = db.query(`
  SELECT
    watches.brand_name,
    watches.model_name,
    watches.image,
    JSON_ARRAY(GROUP_CONCAT(price_history.price)) AS price_history
  FROM
      watches
  LEFT JOIN
      price_history ON watches.id = price_history.watch_id
  WHERE
      watches.model_name = ?
  GROUP BY
      watches.brand_name,
      watches.model_name,
      watches.image
  `, [watchModel]);

  const data = rawData.map(row => ({
    brand_name: row.brand_name,
    model_name: row.model_name,
    image: row.image,
    price_history: JSON.parse(row.price_history.replace(/["']/g, ''))
  }));
  
  return data;
}

module.exports = {
  getMultiple,
  getBrandName,
  getBrandInfos,
  getWatchDetails
}