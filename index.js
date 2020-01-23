const express = require('express')
const jwt = require('jsonwebtoken')

const index = express()

const verifyToken = (req, res, next) => {

    const bearerHeader = req.headers.authorization

    if (!bearerHeader) {
        res.sendStatus(403)
        return
    } else {
        const bearer = bearerHeader.split(' ')

        const token = bearer[1]

        req.token = token
        next()
    }
}

index.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to api endpoint'
    })
})

index.post('/api/create', verifyToken,(req, res) => {

    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err){
            res.json({
                err
            })
        }
        else {
            res.json({
                authData,
                message: 'created successfully'
            })
        }
    })

})


index.post('/api/login', (req, res) => {
    // mock user
    const user = {
        id: 1,
        name: 'kee',
        email: 'keetest@gmail.com'
    }

    jwt.sign({user}, 'secretKey', {expiresIn: '30 seconds'}, (err, token) => {
        res.json({
            token: token,
        })
    })


})

index.listen('5000', () => console.log("Listening to port 5000"))
