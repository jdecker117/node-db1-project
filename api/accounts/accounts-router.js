const router = require('express').Router()
const Accounts = require('./accounts-model')
const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then(result => {
    res.status(200).json(result)
  })
})

router.get('/:id', checkAccountId,(req, res, next) => {
  res.json(req.account)
})

router.post('/',  checkAccountPayload, checkAccountNameUnique,(req, res, next) => {
  Accounts.create(req.body)
  .then(result => {
    res.status(201).json({id: result.id, name: result.name.trim(), budget: result.budget})
  })
  .catch(err => {
    console.log(err)
  })
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try{const updated = await Accounts.updateById(req.params.id, req.body)
  res.json(updated)}
  catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then(
    res.status(200).json(req.account)
  )
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
