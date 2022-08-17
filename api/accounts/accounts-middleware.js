const Accounts = require('../accounts/accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  if(req.body.name === undefined || req.body.budget === undefined){
    res.status(400).json({message: "name and budget are required"})
    next()
  }
  else if(req.body.name.trim().length < 3 || req.body.name.trim().length > 100){
    res.status(400).json({message: "name of account must be between 3 and 100"})
    next()
  }
  else if(typeof req.body.budget !== "number" || isNaN(req.body.budget)){
    res.status(400).json({message: "budget of account must be a number"})
    next()
  }
  else if(req.body.budget < 0 || req.body.budget > 1000000){
    res.status(400).json({message: "budget of account is too large or too small"})
    next()
  }
  else{
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
    const existing = await db('accounts').where('name', req.body.name.trim()).first()

    if(existing){
      res.status(400).json({message: 'that name is taken'})
    } else{
      next()
    }
  } catch(err){
    next(err)
  }
}

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
  .then(result => {
    if(!result){
      res.status(404).json({message: "account not found"})
    }
    else{
      req.account = result;
      next();
    }
  })
  .catch(error => next(error))
}
