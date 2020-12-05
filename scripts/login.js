const login = document.querySelector('.login');

login.addEventListener('submit',function(event){

    event.preventDefault(); 
    
    const email = login.email.value;
    const password = login.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {

        window.location.href='home.html'

    })
    .catch(function(error){

        alert('Los datos ingresados son erróneos o no existen')
        console.log(error.message);

    });

}); 