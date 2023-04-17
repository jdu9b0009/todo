const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAUh566Ogqhv2PUFz1O28tslHzVykIuDfk",
    authDomain: "auth-form-c3b24.firebaseapp.com",
    projectId: "auth-form-c3b24",
    storageBucket: "auth-form-c3b24.appspot.com",
    messagingSenderId: "550994034114",
    appId: "1:550994034114:web:dc44e47957f82ff657ea5b"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const signUp = () => {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    console.log(email, password, name)

    firebase.auth().createUserWithEmailAndPassword(email, password, name)
        .then((result) => {
            alert("サインアップしました");
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        });
}

const signIn = () => {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password, name)
        .then((result) => {
            window.location.href = window.location.origin + "/To-do/index.html"
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        });
}