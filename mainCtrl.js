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
   }



}
