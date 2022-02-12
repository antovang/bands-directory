<?php
    session_start();

    //clear the session
    $_SESSION = array();

    //destroy the session
    session_destroy();
    echo "Success";
?>