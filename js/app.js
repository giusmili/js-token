document.addEventListener("DOMContentLoaded", e =>{
    e.preventDefault;

    //objet fomulaire
    // Fonction de génération d'un token aléatoire
    const btn =  document.getElementById('loginForm')
    const generateToken = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';

      //Fragmentation de la chaine de façon aléatoire 
      for (let i = 0; i < 10; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
        console.log(token)
      }
      return token;
    };

    // Utilisateur fictif pour démonstration
    const user = {
      username: 'giusmili',
      password: 'azerty',
      token: ''
    };

    // Fonction de vérification du login et mot de passe
    const verifyCredentials = (username, password) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === user.username && password === user.password) {
            user.token = generateToken(); // On associe le login et mot de passe au token
            resolve(user.token);
          } else {
            reject('Identifiants incorrects');
          }
        }, 1000); // Simulation d'une requête asynchrone
      });
    };

    // Fonction d'authentification avec vérification du token
    const authenticate = (token) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (token === user.token) {
            resolve('Utilisateur authentifié');
          } else {
            reject('Token invalide');
          }
        }, 300); // Simulation d'une requête asynchrone
      });
    };

    // Fonction de gestion de la soumission du formulaire
    const handleFormSubmit = (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      verifyCredentials(username, password)
        .then((token) => {
          console.log('Login réussi');
          return authenticate(token);
        })
        .then((message) => {
          Swal.fire(
            'Vous êtes connectés',
            'Validez sur le bouton',
            'success'
          )
          console.log(message);
         localStorage.setItem("user", user.token);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erreur de connexion',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          console.log('Erreur :', error);
        });
    };

    // Ajout d'un gestionnaire d'événement pour la soumission du formulaire
 btn.addEventListener('submit', handleFormSubmit);

})