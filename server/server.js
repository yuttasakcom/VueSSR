import express from 'express'

const app = express()

app.set('port', process.env.PORT || '3000')
app.use(express.static('public'))

app.use('*', (req, res) => {
  res.send(
    `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <div id="app"></div>
            <script src="bundle.js"></script>
        </body>
        </html>
    `
  )
})

app.listen(app.get('port'), () => {
  console.log(`Server running at port:${app.get('port')}`)
})
