const express = require('express')
const router = express.Router()
const db = require('../database/index')

//Trouve tous les utilisateur 
router.get('/', (request, response) => {
    // res.send(db.query("SELECT * FROM users;"))
    db.query("SELECT * FROM users", [] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Trouve un utilisateur selon son id
router.get('/:id', (request, response) => {
    // res.send(db.query("SELECT * FROM users;"))
    db.query("SELECT * FROM users WHERE id=$1", [request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Efface un utilisateur selon son id
router.delete('/delete/:id', (request, response) => {
    // res.send(db.query("SELECT * FROM users;"))
    db.query("DELETE FROM users WHERE id=$1", [request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Modifie un utilisateur selon son id
router.put('/edit/:id', (request, response) => {
    const email = request.body.email
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const login = request.body.login
    const password = request.body.password
    const phone = request.body.phone
    // res.send(db.query("SELECT * FROM users;"))
    db.query("UPDATE users SET email=$1,firstname=$2 ,lastname=$3, login=$4, password=$5, phone=$6 WHERE id=$7", [email, firstname, lastname, login, password, phone,request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Créer un utilisateur
router.post('/createUser/', (request, response) => {
    const email = request.body.email
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const login = request.body.login
    const password = request.body.password
    const phone = request.body.phone
    // db.query('INSERT INTO users (email, firstname, lastname, login, password, phone) VALUES ("' + email + '", "' + firstname + '", "' + lastname + '", "' + login + '", "' + password + '", "' + phone + '")')
    db.query('INSERT INTO users (email, firstname, lastname, login, password, phone) VALUES ($1, $2, $3, $4, $5, $6)', [email, firstname, lastname, login, password, phone], (error, results) => 
    {
        if (error) 
        {
            console.log(error)
        }
        else 
        {
            response.status(201).send(`User added`)
        }
    })
})


module.exports = router;