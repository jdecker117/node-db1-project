const db = require('../../data/db-config')

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts'.where('id', id).first())
}

const create = async account => {
  const [id] = await db('accounts').insert(account);
  return await getById(id)
}

const updateById = async (id, account) => {
  await db('accounts').update(account).where('id', id);
  return getById(id)
}

const deleteById = async id => {
  const result = await getById(id);
  await db('accounts').delete().where('id', id);
  return result
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
