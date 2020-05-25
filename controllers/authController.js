const {User} = require('../models/user')

const bcrypt = require('bcrypt')

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/

module.exports = {
  signup(req, res) {
    const {body: {username, password, email}} = req
    console.log(req.body)
    if (username !== '' && password !== '' && email !== '') {

      if (emailRegex.test(email) && passwordRegex.test(password) && username.length >= 4 && username.length <= 16) {

        User.findOrCreate({where: {email, username}, defaults: {email: email, username: username, password: password}})
                .then(([user, created]) => {

                  if (created){
                    return res.status(200).json({
                      success: true,
                      msg: 'Utilisateur créé !',
                      username,
                      email
                    })
                  }else {
                    return res.status(400).json({
                      success: false,
                      msg: 'Un user avec le même email et/ou username existe déjà'
                    })
                  }

                })
      } else {
        return res.status(400).json({
          success: false,
          msg: 'L\'email, l\'username et/ou le mot de passe ne sont pas definis correctement'
        })
      }

    } else {
      return res.status(400).json({
        success: false,
        msg: 'Veuillez remplir tout les champs !'
      })
    }


    return res.status(201).json({
      msg: 'Nouvel utilisateur créé !',
      username,
      email
    })
  },
  signin(req, res) {
    const {body: {username}} = req
    return res.status(200).json({
      msg: `Bienvenue ${username} !`
    })
  }
}
