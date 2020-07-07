const express = require('express')
const router = express.Router()
const db = require('../database/index')

//Trouve tous les ratings
router.get('/', (req, response) => {
    db.query("SELECT * FROM rating", [] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Trouve un rating selon son id
router.get('/:id', (request, response) => {
    // res.send(db.query("SELECT * FROM users;"))
    db.query("SELECT * FROM rating WHERE id=$1", [request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Efface un rating selon son id
router.delete('/delete/:id', (request, response) => {
    // res.send(db.query("SELECT * FROM users;"))
    db.query("DELETE FROM rating WHERE id=$1", [request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Modifie un rating selon son id
router.put('/edit/:id', (request, response) => {
    const note = request.body.note
    const description = request.body.description
    const fk_user_id = request.body.fk_user_id
    const fk_movie_id = request.body.fk_movie_id
    db.query("UPDATE rating SET note=$1,description=$2 ,fk_user_id=$3, fk_movie_id=$4 WHERE id=$5", [note, description, fk_user_id, fk_movie_id,request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Créer un nouveau rating     
router.post('/addRating/', (request, response) => {
    const note = request.body.note
    const description = request.body.description
    const fk_user_id = request.body.fk_user_id
    const fk_movie_id = request.body.fk_movie_id
    db.query('INSERT INTO rating (note, description, fk_user_id, fk_movie_id) VALUES ($1, $2, $3, $4)', [note, description, fk_user_id, fk_movie_id], (error, results) => 
    {
        if (error) 
        {
            console.log(error)
        }
        else 
        {
            response.status(201).send(`Rating added`)
        }
    })
})

module.exports = router;