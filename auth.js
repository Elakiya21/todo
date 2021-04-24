
const signup = document.querySelector('#sign-up');
signup.addEventListener("click", e => {
    e.preventDefault();
    const email = document.getElementById("email-ID").value
    const password = document.getElementById("pass-word").value
    auth.createUserWithEmailAndPassword(email, password).then(() => {
        document.getElementById("error").innerHTML = "";
        window.location = "todo.html";
    }).catch(err => {
        document.getElementById("error").innerHTML = err.message;

    })

})

const login = document.querySelector('#log-in');
login.addEventListener("click", e => {
    e.preventDefault();
    const email = document.getElementById("email-ID").value
    const password = document.getElementById("pass-word").value
    auth.signInWithEmailAndPassword(email, password).then(() => {
        document.getElementById("error").innerHTML = "";
        window.location = "todo.html";
    }).catch(err => {
        document.getElementById("error").innerHTML = err.message;

    })

})