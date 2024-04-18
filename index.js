const express = require('express')
const cors = require('cors')
const database = require('./back-config/config/db')

const uuid = require('uuid') // Importer le module uuid
const { log } = require('console')

const app = express()
app.use(cors())
app.use(express.json()) // Ceci doit être ajouté avant vos routes

app.get('/', (req, res) => {
  res.send('Hello World, Welcome to my Todo API!')
})
app.get('/items', (req, res) => {
  database
    .query('SELECT * FROM items')
    .then(([items]) => res.json(items))
    .catch((err) => {
      console.error(err)
      res.status(500).send('error retrieving data from database')
    })
})
// app.post('/items', (req, res) => {
//   database
//     .query('INSERT INTO items SET ?', req.body)
//     .then(() => res.status(201).send('item added'))
//     .catch((err) => {
//       console.error(err)
//       res.status(500).send('error adding item')
//     })
// })
// app.delete('/items/:id', (req, res) => {
//   const itemId = req.params.id
//   console.log('itemId', itemId)
//   database
//     .query('DELETE FROM items WHERE id = ?', itemId)
//     .then(() => res.status(200).send('item deleted'))
//     .catch((err) => {
//       console.error(err)
//       res.status(500).send('error deleting item')
//     })
// })
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id

  database
    .query('DELETE FROM items WHERE id = ?', itemId)
    .then(() => {
      // Si la suppression réussit, renvoyer une réponse JSON avec un message approprié
      res.status(200).json({ message: 'Item deleted successfully' })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('error deleting item')
    })
})

// app.put('/items/:id', (req, res) => {
//   database
//     .query('UPDATE items SET ? WHERE id = ?', [req.body, req.params.id])
//     .then(() => res.status(200).send('item updated'))
//     .catch((err) => {
//       console.error(err)
//       res.status(500).send('error updating item')
//     })
// })
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id
  const updatedItem = req.body // Obtenir l'élément mis à jour à partir du corps de la requête

  database
    .query('UPDATE items SET ? WHERE id = ?', [updatedItem, itemId])
    .then(() => {
      // Après la mise à jour réussie, récupérer l'élément mis à jour depuis la base de données
      database
        .query('SELECT * FROM items WHERE id = ?', itemId)
        .then(([updatedItem]) => {
          // Renvoyer l'élément mis à jour sous forme de réponse JSON
          res.status(200).json(updatedItem)
        })
        .catch((err) => {
          console.error(err)
          res.status(500).send('error retrieving updated item from database')
        })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('error updating item')
    })
})

app.post('/items', (req, res) => {
  if (req.body && req.body.title) {
    const item = {
      title: req.body.title,
      isComplete: false,
      created: new Date(),
      itemContent: req.body.itemContent || '',
      id: uuid.v4(), // Générer un ID unique pour l'élément
    }

    console.log('item créé back', item) // Log des données de item

    database
      .query('INSERT INTO items SET ?', item)
      .then((result) => {
        // Récupérer l'ID généré par la base de données à partir du résultat de la requête
        const insertedId = result.insertId
        // Ajouter l'ID généré à l'objet item
        item.id = insertedId
        // console.log('item créé back', insertedId) // Log des données de item;
        res.status(201).json(item)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send("Erreur lors de l'ajout de l'élément")
      })
  } else {
    res.status(400)
    res.send('Le titre est obligatoire')
  }
})

app.get('/items/:id', (req, res) => {
  database
    .query('SELECT * FROM items WHERE id = ?', req.params.id)
    .then(([item]) => res.json(item))
    .catch((err) => {
      console.error(err)
      res.status(500).send('error retrieving data from database')
    })
})
app.listen(5000, console.log('Serveur démarré sur http://localhost:5000'))
