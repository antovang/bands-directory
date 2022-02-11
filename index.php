<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Annuaire</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script defer src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
<body>

<header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" onclick="changePage('groupes')" href="#">Groupes</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" onclick="changePage('musiciens')" href="#">Musiciens</a>
                    </li>

                    <li class="nav-item">
                        <?php if(!isset($_SESSION)){ ?>
                            <a id="logButton" class="btn btn-success" onclick="changePage('login')">Log in</a>
                        <?php }else{ ?>
                            <?= $_SESSION ?>
                            <a id="logButton" class="btn btn-danger">Log out</a>
                        <?php } ?>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <h1>Annuaire en ligne</h1>
    <p>La mairie de Grenoble propose son annuaire 100% dématérialisé</p>


</header>

<section id="groupes" class="container">
    <!-- We will put our React component inside this div. -->
    <table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Groupe</th>
            <th scope="col"># Musiciens</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody id="ligneGroupe"></tbody>
    </table>
</section>

<section id="musiciens" class="container">
    <!-- We will put our React component inside this div. -->
    <table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Prenom</th>
            <th scope="col">Nom</th>
            <th scope="col">Groupe</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody id="ligneMusicien"></tbody>
    </table>
</section>

<section id="login" class="container">
    <!-- We will put our React component inside this div. -->
    <div id="loginFormContainer"></div>
</section>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Load React. -->
<!-- Note: when deploying, replace "development.js" with "production.min.js". -->
<script defer src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script defer src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

<!-- Load our React component. -->
<script src="app.jsx" type="text/babel"></script>

</body>
</html>