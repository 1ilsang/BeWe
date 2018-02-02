'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

exports.list = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT
        g.title,
        g.image,
        g.description,
        ug.created_at
      FROM users_has_games AS ug
        LEFT JOIN games AS g ON ug.games_idx = g.idx
      WHERE ug.users_idx = ?
      `;
    pool.query(sql, [inputData.userIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


/*************
 * 게임 구매
 * TODO 중복 구매 예외처리
 * @param inputData
 * @returns {Promise<any>}
 */
exports.purchase = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      INSERT INTO users_has_games (users_idx, games_idx)
      VALUES (?, ?)
      `;
    pool.query(sql, [inputData.userIdx, inputData.gameIdx],
      (err ,rows) => {
        if (err) {
          reject(err)
        } else {
          if (rows.affectedRows === 1) {
            resolve(rows);
          } else {
            const _err = new Error("PURCHASE CUSTOM ERROR 1");
            reject(_err);
          }
        }
      })
  }).then((result) => {
    return new Promise((resolve, reject) => {
      const sql =
        `
        SELECT
          u.idx,
          u.nickname,
          u.avatar,
          g.title,
          g.image,
          g.description,
          ug.created_at
        FROM users_has_games AS ug
          LEFT JOIN games AS g ON ug.games_idx = g.idx
          LEFT JOIN users AS u ON g.users_idx = u.idx
        WHERE ug.idx = ?
        `;
      pool.query(sql, [result.insertId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0])
        }
      });
    });
  })
};