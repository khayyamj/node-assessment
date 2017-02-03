var express = require('express')
var bodyParser = require('body-parser')
var app = module.exports = express();
var users = require('./users.json')
var mainCtrl = require('./mainCtrl')

app.use(bodyParser.json())

app.get('/api/users', mainCtrl.userList)
app.get('/api/users/admin', mainCtrl.adminList)
app.get('/api/users/moderator', mainCtrl.modList)
app.get('/api/users/user', mainCtrl.userList)
app.get('/api/users/:userId', mainCtrl.specificUser)
app.post('/api/users', mainCtrl.addUser)
app.post('/api/users/admin', mainCtrl.addAdmin)
app.post('/api/users/moderator', mainCtrl.addMod)
app.post('/api/users/user', mainCtrl.addUser)
app.post('/api/users/language/:userId', mainCtrl.changeLanguage)
app.post('/api/users/forums/:userId', mainCtrl.addForum)
app.delete('/api/users/forums/:userId', mainCtrl.deleteForum)
app.delete('/api/users/:id', mainCtrl.removeUser)


app.listen(3000, function() {
   console.log('Listening on port 3000')
})
