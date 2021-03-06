'use strict';

window.onload = init;

var logged_in;
var musiciens = [];
var groupes = [];

// INITIALISATION VARIABLE DE SESSION JS
//On vérifie qu'il n'y a pas de session existante. Si oui => on set la variable de session js à TRUE
$.post("check_connexion.php").done(function (response) {
    logged_in = response;
});

const loginContainer = document.querySelector('#loginFormContainer');
const logBtnContainer = document.querySelector('#logBtnContainer');
const tableauMusiciensContainer = document.querySelector('#ligneMusicien');
const tableauGroupesContainer = document.querySelector('#ligneGroupe');

var data = {
    Groupes: [
        {id: "1", nom: "Beatles", nbMusiciens: 4},
        {id: "2", nom: "Pink Floyd", nbMusiciens: 4},
        {id: "3", nom: "Imagine Dragons", nbMusiciens: 4},
        {id: "4", nom: "Coldplay", nbMusiciens: 4}
    ],
    Musiciens: [
        {id: "1", prenom: "Paul", nom: "McCartney", groupe: "Beatles"},
        {id: "2", prenom: "John", nom: "Lennon", groupe: "Beatles"},
        {id: "3", prenom: "Ringo", nom: "Star", groupe: "Beatles"},
        {id: "4", prenom: "George", nom: "Harrison", groupe: "Beatles"},
    ]
}

function init() {
    changePage("groupes");

    musiciens = [];
    groupes = [];

    for (const item of Object.values(data.Musiciens)) {
        musiciens.push(<LigneMusicien {...item} />);
    }

    for (const item of Object.values(data.Groupes)) {
        groupes.push(<LigneGroupe {...item} />);
    }

    ReactDOM.render(
        <LoginForm/>
        , loginContainer);

    ReactDOM.render(
        <LoginButton/>
        , logBtnContainer);

    ReactDOM.render(
        musiciens
        , tableauMusiciensContainer);

    ReactDOM.render(
        groupes
        , tableauGroupesContainer);
}

function changePage(sectionName) {
    $('section').css("display", "none");
    $('#' + sectionName).css("display", "block");
}

function LoginButton() {

    if (logged_in) {
        return (
            <button id="logButton" className="btn btn-danger" onClick={logoutAction}>Log out</button>
        );
    } else {
        return (
            <button id="logButton" className="btn btn-success" onClick={() => changePage('login')}>Log in</button>
        );
    }
}

function logoutAction() {
    $.get('logout.php')
        .done(function (response) {

            if (response == true) {
                //Si tout se passe bien on set la variable de session JS à FALSE
                logged_in = false;
                // On recharge le contenu de la page pour remettre à jour les actions sur les lignes
                init();
            }

        });
}

function LigneMusicien(props) {

    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td> {props.prenom} </td>
            <td> {props.nom}</td>
            <td> {props.groupe} </td>
            {logged_in
                ? <td><DeleteButton/></td>
                : <td><LookButton/></td>
            }
        </tr>
    );
}

function DeleteButton() {
    return (
        <button className="nav-link" className="btn btn-danger" href="#"> Delete </button>
    );
}

function LookButton() {
    return (
        <button className="nav-link" className="btn btn-primary" href="#"> Voir </button>
    );
}

function LigneGroupe(props) {

    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td> {props.nom}</td>
            <td> {props.nbMusiciens} </td>
            {logged_in
                ? <td><DeleteButton/></td>
                : <td><LookButton/></td>
            }
        </tr>
    );
}

function LoginForm() {

    return (
        <form id="loginForm" method="post" onSubmit={onSubmitAction}>
            <div className="mb-3">
                <label htmlFor="exampleInputLogin1" className="form-label">Login</label>
                <input type="text" name="login" className="form-control" id="loginInput"/>
                <div id="emailHelp" className="form-text">We'll never share your login with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="pwInput"/>
            </div>
            <button className="btn btn-success">Submit</button>
        </form>
    );
}

function onSubmitAction(e) {
    //not reloading page on submit
    e.preventDefault();
    loginCheck();
}

function loginCheck() {
    let login = $('#loginInput').val();
    let pw = $('#pwInput').val();

    $.post('script.php', {login: login, password: pw})
        .done(
            function (msg) {
                if (msg == "Success") {
                    logged_in = true;
                    init();
                } else {
                    logged_in = false;
                }
            });
}

