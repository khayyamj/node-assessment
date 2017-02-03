var users = require('./users.json')

module.exports = {

   userList: function(req, res, next) {
      var query = req.query.language;
      var list = [];
      if (query === 'klingon' ||
         query === 'english' ||
         query === 'french' ||
         query === 'spanish') {
            for (var i = 0; i < users.length; i++) {
               if (users[i].language.toLowerCase() === query) {
                  list.push(users[i]);
               }
            }
            res.status(200).json(list)
            return;
         }
      res.status(200).json(users)
   },

   specificUser: function(req, res, next) {
      var id = req.params.userId;
      var user;
         for (var i = 0; i < users.length; i++) {
            if (users[i].id == id) {
               user = users[i];
               res.status(200).json(user)
               return;
            }
         }
      res.status(404).json("User not found")
   },

   adminList: function(req, res, next) {
      var list = [];
      for (var i = 0; i < users.length; i++) {
         if (users[i].type.toLowerCase() === "admin") {
            list.push(users[i]);
         }
      }
      res.status(200).json(list)
   },

   modList: function(req, res, next) {
      var list = [];
      for (var i = 0; i < users.length; i++) {
         if (users[i].type.toLowerCase() === "moderator") {
            list.push(users[i]);
         }
      }
      res.status(200).json(list)
   },

   userList: function(req, res, next) {
      var list = [];
      for (var i = 0; i < users.length; i++) {
         if (users[i].type.toLowerCase() === "user") {
            list.push(users[i]);
         }
      }
      res.status(200).json(list)
   },

   addUser: function(req, res, next) {
      var id = users.length + 1;
      var info = req.body;
      var newUser = {
         id: id,
         first_name: info.first_name,
         last_name: info.last_name,
         email: info.email,
         gender: info.gender,
         language: info.language,
         age: info.age,
         city: info.city,
         state: info.state,
         type: "user",
         favorites: info.favorites
      };
      users.push(newUser);
      res.status(200).json(newUser);
   },

   addAdmin: function(req, res, next) {
      var id = users.length + 1;
      var info = req.body;
      var newUser = {
         id: id,
         first_name: info.first_name,
         last_name: info.last_name,
         email: info.email,
         gender: info.gender,
         language: info.language,
         age: info.age,
         city: info.city,
         state: info.state,
         type: "admin",
         favorites: info.favorites
      };
      users.push(newUser);
      res.status(200).json(newUser);
   },

   addMod: function(req, res, next) {
      var id = users.length + 1;
      var info = req.body;
      var newUser = {
         id: id,
         first_name: info.first_name,
         last_name: info.last_name,
         email: info.email,
         gender: info.gender,
         language: info.language,
         age: info.age,
         city: info.city,
         state: info.state,
         type: "moderator",
         favorites: info.favorites
      };
      users.push(newUser);
      res.status(200).json(newUser);
   },

   changeLanguage: function(req, res, next) {
      var id = req.params.userId;
      var newLanguage = req.body.language.toLowerCase();
      for (var i = 0; i < users.length; i++) {
         if (users[i].id == id) {
            users[i].language = newLanguage;
            res.status(200).json('Language update to: ' + users[i].language)
            return;
         }
      }
      res.status(400).json('User not found')
   },

   addForum: function(req, res, next) {
      var id = req.params.userId;
      var newForum = req.body.add.toLowerCase();
      for (var i = 0; i < users.length; i++) {
         if (users[i].id == id) {
            users[i].favorites.push(newForum);
            res.status(200).json('Favorite forums updated: ' + users[i].favorites)
            return;
         }
      }
      res.status(400).json('User not found')
   },

   deleteForum: function(req, res, next) {
      var id = req.params.userId;
      var remForum = req.query.favorite.toLowerCase();
      for (var i = 0; i < users.length; i++) {
         if (users[i].id == id) {
            for (var j = 0; j < users[i].favorites.length; j++) {
               if (users[i].favorites[j] === remForum){
                  users[i].favorites.splice(j,1)
                  res.status(200).json('Favorite forums updated: ' + users[i].favorites)
                  return;
               }
            }
         }
      }
      res.status(400).json('User not found')
   },

   removeUser: function(req, res, next) {
      var id = req.params.id;
      for (var i = 0; i < users.length; i++) {
         if (users[i].id == id) {
            var removedUser = users[i].first_name + ' ' + users[i].last_name
            users.splice(i,1)
            var responseStr = 'User ' + removedUser + ' has been removed'
            res.status(200).json(responseStr)
            return;
         }
      }
      res.status(400).json('User not found')
   }



}
