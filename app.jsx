'use strict';

window.onload = demarrer;

function demarrer(){
    changePage("groupes");
}

var logged_in = true;
var musiciens = [];
var groupes = [];

var data = {
    Groupes : [
        {id:"1",nom:"Beatles",nbMusiciens:4},
        {id:"2",nom:"Pink Floyd",nbMusiciens:4},
        {id:"3",nom:"Imagine Dragons",nbMusiciens:4},
        {id:"4",nom:"Coldplay",nbMusiciens:4}
    ],
    Musiciens : [
        {id:"1",prenom:"Paul", nom:"McCartney",groupe:"Beatles"},
        {id:"2",prenom:"John", nom:"Lennon",groupe:"Beatles"},
        {id:"3",prenom:"Ringo", nom:"Star",groupe:"Beatles"},
        {id:"4",prenom:"George", nom:"Harrison",groupe:"Beatles"},
    ]
}

for (const item of Object.values(data.Musiciens)){
    let dynamicProps = item;
    musiciens.push(<LigneMusicien {...dynamicProps} />)
}

for (const item of Object.values(data.Groupes)){
    let dynamicProps = item;
    groupes.push(<LigneGroupe {...dynamicProps} />)
}

function changePage(sectionName){
    $('section').css("display","none");
    $('#' + sectionName).css("display","block");
}

function LigneMusicien(props){

    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td> {props.prenom} </td>
            <td> {props.nom}</td>
            <td> {props.groupe} </td>
            {logged_in
                ? <td><DeleteButton /></td>
                : <td><LookButton /></td>
            }
        </tr>
    );
}

function DeleteButton(){
    return (
        <button className="nav-link" className="btn btn-danger" href="#" > Delete </button>
    );
}

function LookButton(){
    return (
        <button className="nav-link" className="btn btn-primary" href="#" > Voir </button>
    );
}

function LigneGroupe(props){

    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td> {props.nom}</td>
            <td> {props.nbMusiciens} </td>
            {logged_in
                ? <td><DeleteButton /></td>
                : <td><LookButton /></td>
            }
        </tr>
    );
}

function LoginForm(){

    return (
        <form id="loginForm" method="post">
            <div className="mb-3">
                <label htmlFor="exampleInputLogin1" className="form-label">Login</label>
                <input type="text" name="login" className="form-control" id="loginInput"/>
                    <div id="emailHelp" className="form-text">We'll never share your login with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password"  className="form-control" id="pwInput"/>
            </div>
            <button className="btn btn-success" onClick={loginCheck}>Submit</button>
        </form>
    );
}

function loginCheck(){
    let login = $('#loginInput').val();
    let pw = $('#pwInput').val();

    $.ajax({
        method: "POST",
        url: "script.php",
        data: { login: login, password: pw }
    })
        .done(function( msg ) {
            if(msg == "Success") {
                logged_in = true;
            }else{
                logged_in = false;
            }
    });
}

const loginContainer = document.querySelector('#loginFormContainer');
const tableauMusiciensContainer = document.querySelector('#ligneMusicien');
const tableauGroupesContainer = document.querySelector('#ligneGroupe');

ReactDOM.render(
    <LoginForm />
    ,loginContainer);

ReactDOM.render(
    musiciens
    ,tableauMusiciensContainer);

ReactDOM.render(
    groupes
    ,tableauGroupesContainer);
