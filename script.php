<?php
    $login_admin = "admin";
    $password = "ajax";

    if( isset($_POST['login']) && isset($_POST['password']) ){

        if ($_POST['login'] == $login_admin && $_POST['password'] == $password){
            if(!isset($_SESSION['user'])){
                session_start();
                $_SESSION['user'] = $login_admin;
                echo "Success";
            }else{
                echo "Failed";
            }
        }
        else{
            echo "Failed";
        }
    }
?>