const db = require('../../data/dbConfig');

const findById = id => {
  return db('users').where({ id }).first();
}

const findBy = filter => {
  return db('users').where(filter).orderBy('id', 'asc');
}

const create = async user => {
  const [ id ] = await db('users').insert(user);
  return findById(id);
}

module.exports = {
  findBy,
  findById,
  create
}