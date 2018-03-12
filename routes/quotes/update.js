const Quote = require('../../models/Quote')
const lozinka = process.env.LOZINKA

module.exports = (req, res) => {
  const {_id, en, sr, author, source, password} = req.body
  const condition = (en || sr) && author
  if (!condition) return res.send('ARGUMENTS_ERROR')
  if (password !== lozinka) return res.send('LOGIN_REQUIRED')

  Quote.findById(_id, (err, quote) => {
    if (err) return console.error(err)
    quote.set({ en, sr, author, source })
    quote.save(err => {
      if (err) return console.error(err)
      res.send('SUCCESS_SAVED')
    })
  })
}