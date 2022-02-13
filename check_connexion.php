<?php
    session_start();

    if(isset($_SESSION)){
        if(isset($_SESSION['user']) && $_SESSION['user'] == "admin"){
            echo true;
        }else{
            echo false;
        }
    }else{
        echo false;
    }
?>