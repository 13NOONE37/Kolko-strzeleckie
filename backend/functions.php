<?php
function IsAuth()
{
    return isset($_SESSION['id_uzytkownika']);
}
function isAdmin()
{

    if (isset($_SESSION['czyAdmin'])) {
        return $_SESSION['czyAdmin'] == 1;
    }
    return false;
}

function clearSession()
{
    session_unset();
    session_destroy();
    setcookie('session_id', '', time() - 3600, '/', 'example.com', false, true);

}
?>