var users = require('./users.json')

module.exports = {

   userList: function(req, res, next) {
      var q = req.query;
      var language = q.language;
      var city = q.city;
      var age = q.age;
      var state = q.state;
      var gender = q.gender;
      var list = [];
      console.log(gender, language, age, city, state)
      if (language === 'klingon' ||
         language === 'english' ||
         language === 'french' ||
         language === 'spanish') {
            for (var i = 0; i < users.length; i++) {
               if (users[i].language.toLowerCase() === language) {
                  list.push(users[i]);
               }
            }
            res.status(200).json(list)
            return;
         }
      if (city) {
         console.log('city: ', city)
         for (var i = 0; i < users.length; i++) {
            if (users[i].city === city) {
               list.push(users[i])
            }
         }
      }
      if (age) {
         console.log('age ', age)
         for (var i = 0; i < users.length; i++) {
            console.log(users[i].first_name,users[i].age, age)
            if (users[i].age == age) {
               list.push(users[i])
            }
         }
      }
      if (state) {
         console.log('state: ', state)
         for (var i = 0; i < users.length; i++) {
            if (users[i].state === state) {
               list.push(users[i])
            }
         }
      }
      if (gender) {
         console.log('gender: ',gender)
         for (var i = 0; i < users.length; i++) {
            if (users[i].gender === gender) {
               list.push(users[i])
            }
         }
      }
      if (!list) {
         res.status(200).json(list)
         return;
      }
      res.status(200).json(users)
   },

   specificUser: function(req, res, next) {
      console.log("specificUser")
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

   userListOnly: function(req, res, next) {
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
   },

   updateUser: function(req, res, next) {
      console.log(req.body)
      var id = req.params.id
      for (var i = 0; i < users.length; i++) {
         if (users[i].id == id){
            for (prop in req.body) {
               if (prop = users[i].prop) {
                  users[i].prop = req.body.prop
                  console.log(users[i])
                  res.status(200).json(users[i])
               }
            }
         }
      }

   }



}
