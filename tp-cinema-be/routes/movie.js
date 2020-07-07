const express = require('express')
const router = express.Router()
const db = require('../database/index')

//Trouve tous les movies
router.get('/', (req, response) => {
    db.query("SELECT * FROM movie", [] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Trouve un movie selon son id
router.get('/:id', (request, response) => {
    // res.send(db.query("SELECT * FROM users;"))
    db.query("SELECT * FROM movie WHERE id=$1", [request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Efface un movie selon son id
router.delete('/delete/:id', (request, response) => {
    // res.send(db.query("SELECT * FROM users;"))
    db.query("DELETE FROM movie WHERE id=$1", [request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})


//Modifie un movie selon son id
router.put('/edit/:id', (request, response) => {
    const name = request.body.name
    const yearpublish = request.body.yearpublish
    const realisator = request.body.realisator
    const synopsis = request.body.synopsis
    db.query("UPDATE movie SET name=$1,yearpublish=$2 ,realisator=$3, synopsis=$4 WHERE id=$5", [name, yearpublish, realisator, synopsis,request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Créer un nouveau movie    
router.post('/addMovie/', (request, response, result) => {
    const name = request.body.name
    const yearpublish = request.body.yearpublish
    const realisator = request.body.realisator
    const synopsis = request.body.synopsis
    db.query('INSERT INTO movie (name, yearpublish, realisator, synopsis) VALUES ($1, $2, $3, $4)', [name, yearpublish, realisator, synopsis], (error, results) => 
    {
        if (error) 
        {
            console.log(error)
        }
        else 
        {
            response.status(201).send(`Movie added`)
        }
    })
})

//Moyenne de note du movie
router.get('/averageMovie/:id', (request, response) => {
    db.query("SELECT M.id, ROUND(AVG(note), 1) as average, M.name FROM movie as M INNER JOIN rating as R ON M.id = R.fk_movie_id GROUP BY M.id HAVING M.id=$1", [request.params.id] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})

//Moyenne des notes des movies
router.get('/allMovies/', (request, response) => {
    db.query("SELECT ROUND(AVG(note), 1) as average, M.name FROM movie as M INNER JOIN rating as R ON M.id = R.fk_movie_id GROUP BY M.id", [] , (err,res) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(res.rows)
            response.send(res.rows)
        }
    })
})


module.exports = router;