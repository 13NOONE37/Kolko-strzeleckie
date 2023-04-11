<?php
session_start();
require('functions.php');

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'apka_strzelectwo';

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


header('Content-Type: application/json');

//!done
//?dane treningów konkrentego użytkownika parametry które musimy tu zmienić to imie, nazwisko, i data w zaleznosci od sezonu
//? w POSTcie trzeba już zaakceptować konkretną datę od ktorej do której chcemy treningi
// SELECT treningi.data_treningu, wyniki.punkty, wyniki.dziesiatki, wyniki.uwagi
// FROM treningi INNER JOIN (uzytkownicy INNER JOIN wyniki ON uzytkownicy.id_uzytkownika = wyniki.id_uzytkownika) ON treningi.id_treningu = wyniki.id_treningu
// WHERE uzytkownicy.id='$id_uzytkownika' AND treningi.data_treningu BETWEEN '$start_date' AND '$end_date'
// ORDER BY treningi.data_treningu DESC;
//!done

//!done
//?lista treningów z danego sezonu od ostatniego do najstarszego
//?przyda się w rankingu w wyborze ile ostatnich treningów chcemy uwzględnić
//?przyda się też w treningach w panelu paluszkiewicza
//? akceptuje dwa parametry poczatek sezonu i koniec
// SELECT treningi.data_treningu, treningi.id_treningu
// FROM treningi
// WHERE treningi.data_treningu BETWEEN '2022-09-01' AND '2023-06-30'
// ORDER BY treningi.data_treningu DESC;
//!done

//!done
//?ranking
//?akceptuje od którego do którego treningu chcemy brać pod uwagę treningi
//?ostatnim parametrem będzie data końca sezonu a pierwszym ilość treningów
//? w praktyce data z listy treningów która jest już posortowana
// SELECT uzytkownicy.id_uzytkownika, Sum(wyniki.punkty) AS SumOfpunkty, Sum(wyniki.dziesiatki) AS SumOfdziesiatki, uzytkownicy.imie, uzytkownicy.nazwisko
// FROM treningi INNER JOIN (uzytkownicy INNER JOIN wyniki ON uzytkownicy.id_uzytkownika = wyniki.id_uzytkownika) ON treningi.id_treningu = wyniki.id_treningu
// WHERE (((treningi.data_treningu) >= '2023-04-22' AND (treningi.data_treningu) <= '2023-06-30'))
// GROUP BY uzytkownicy.id_uzytkownika, uzytkownicy.imie, uzytkownicy.nazwisko
// ORDER BY SumOfpunkty DESC;
//!done


//!done
//?lista użytkowników bez admina
// SELECT uzytkownicy.id_uzytkownika, uzytkownicy.imie, uzytkownicy.nazwisko
// FROM uzytkownicy
// WHERE (((uzytkownicy.czyAdmin)=False));
//!done



//!done
//todo nie wiem czy to w ogóle potrzebne
//?dane o treningu kiedy będziemy go edytować
//?parametr id treningu
// SELECT uzytkownicy.id_uzytkownika, uzytkownicy.imie, uzytkownicy.nazwisko, wyniki.punkty, wyniki.dziesiatki, wyniki.uwagi
// FROM uzytkownicy INNER JOIN (treningi INNER JOIN wyniki ON treningi.id_treningu = wyniki.id_treningu) ON uzytkownicy.id_uzytkownika = wyniki.id_uzytkownika
// WHERE treningi.id_treningu= 1 '$training_id';
//!done

//!done
//?stworz trening
//?parametr data
//INSERT INTO treningi VALUES(null,"2024-04-04")
//!done

//!done

//?aktualizuj trening
//?parametr id treningu
//?sprawdzamy czy dany trening już istnieje
//?jesli zapytanie zwróci jakiś rekord to będziemy go aktualizować
//SELECT * FROM `wyniki` WHERE id_treningu=1 AND id_uzytkownika=1
//?jesli nie zwroci to tworzymy nowy rekord
// INSERT INTO wyniki (id_treningu, id_uzytkownika, punkty, dziesiatki, uwagi) 
// VALUES (1, 2, '88', '6', '')
//!done



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];

        switch ($action) {

            case 'auth':
                if (isset($_POST['email']) && isset($_POST['password'])) {
                    $email = $_POST['email'];
                    $password = $_POST['password'];

                    $sql = "SELECT * FROM uzytkownicy WHERE email='$email'";
                    $result = mysqli_query($conn, $sql);

                    $row = mysqli_fetch_assoc($result);
                    $hash_password = $row['haslo'];

                    if (password_verify($password, $hash_password)) {
                        $_SESSION['id_uzytkownika'] = $row['id_uzytkownika'];
                        $_SESSION['imie'] = $row['imie'];
                        $_SESSION['nazwisko'] = $row['nazwisko'];
                        $_SESSION['email'] = $row['email'];
                        $_SESSION['czyAdmin'] = $row['czyAdmin'];

                        $data = new stdClass();

                        $data->id_uzytkownika = $row['id_uzytkownika'];
                        $data->imie = $row['imie'];
                        $data->nazwisko = $row['nazwisko'];
                        $data->email = $row['email'];
                        $data->czyAdmin = $row['czyAdmin'];

                        echo json_encode($data);
                    } else {
                        echo json_encode(array('message' => 'Błędny login lub hasło', 'code' => '401'));


                    }



                } else {
                    echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));
                }
                break;

            case 'logout':
                clearSession();
                echo json_encode(array('messsage' => 'Wylogowano pomyślnie', 'code' => '200'));
                break;

            case 'checksession':
                if (isAuth()) {
                    $data = new stdClass();

                    $data->id_uzytkownika = $_SESSION['id_uzytkownika'];
                    $data->imie = $_SESSION['imie'];
                    $data->nazwisko = $_SESSION['nazwisko'];
                    $data->email = $_SESSION['email'];
                    $data->czyAdmin = $_SESSION['czyAdmin'];

                    echo json_encode($data);
                } else {
                    echo json_encode(array('messsage' => 'Nie zalogowano', 'code' => '401'));
                }
                break;

            case 'getranking':
                if (isAuth()) {
                    if (isset($_POST['start_date']) && isset($_POST['end_date'])) {
                        //format daty '2023-04-22'

                        $start_date = $_POST['start_date'];
                        $end_date = $_POST['end_date'];

                        $sql = "SELECT uzytkownicy.id_uzytkownika, Sum(wyniki.punkty) AS SumOfpunkty, Sum(wyniki.dziesiatki) AS SumOfdziesiatki, uzytkownicy.imie, uzytkownicy.nazwisko
                        FROM treningi INNER JOIN (uzytkownicy INNER JOIN wyniki ON uzytkownicy.id_uzytkownika = wyniki.id_uzytkownika) ON treningi.id_treningu = wyniki.id_treningu
                        WHERE (((treningi.data_treningu) >= '$start_date' AND (treningi.data_treningu) <= '$end_date'))
                        GROUP BY uzytkownicy.id_uzytkownika, uzytkownicy.imie, uzytkownicy.nazwisko
                        ORDER BY SumOfpunkty DESC;";
                        $result = mysqli_query($conn, $sql);

                        $data = array();

                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $data[] = $row;
                            }
                            echo json_encode($data);
                        } else {
                            echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                        }


                    } else {
                        echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));

                    }
                } else {
                    echo json_encode(array('message' => 'Żądanie wymaga autoryzacji.', 'code' => '401'));
                }
                break;
            case 'gettrainings':
                if (isAuth()) {
                    if (isset($_POST['start_date']) && isset($_POST['end_date'])) {
                        //format daty '2023-04-22'

                        $start_date = $_POST['start_date'];
                        $end_date = $_POST['end_date'];

                        $sql = "SELECT treningi.data_treningu, treningi.id_treningu
                        FROM treningi
                         WHERE treningi.data_treningu BETWEEN '$start_date' AND '$end_date'
                        ORDER BY treningi.data_treningu DESC;";

                        $result = mysqli_query($conn, $sql);

                        $data = array();

                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $data[] = $row;
                            }
                            echo json_encode($data);
                        } else {
                            echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                        }


                    } else {
                        echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));

                    }
                } else {
                    echo json_encode(array('message' => 'Żądanie wymaga autoryzacji.', 'code' => '401'));
                }
                break;

            case 'getuserslist':
                if (isAuth()) {

                    $sql = " SELECT uzytkownicy.id_uzytkownika, uzytkownicy.imie, uzytkownicy.nazwisko
                         FROM uzytkownicy
                        WHERE (((uzytkownicy.czyAdmin)=False));";
                    $result = mysqli_query($conn, $sql);

                    $data = array();

                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            $data[] = $row;
                        }
                        echo json_encode($data);
                    } else {
                        echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                    }
                } else {
                    echo json_encode(array('message' => 'Żądanie wymaga autoryzacji.', 'code' => '401'));
                }
                break;

            case 'getusertrainings':
                if (isAuth()) {
                    if (isset($_POST['user_id']) && isset($_POST['start_date']) && isset($_POST['end_date'])) {
                        //format daty '2023-04-22'  

                        $start_date = $_POST['start_date'];
                        $end_date = $_POST['end_date'];
                        $user_id = $_POST['user_id'];
                        if ($_SESSION['czyAdmin'] == 0) {
                            $user_id = $_SESSION['id_uzytkownika'];
                        }

                        $sql = "SELECT treningi.data_treningu, wyniki.punkty, wyniki.dziesiatki, wyniki.uwagi
                             FROM treningi INNER JOIN (uzytkownicy INNER JOIN wyniki ON uzytkownicy.id_uzytkownika = wyniki.id_uzytkownika) ON treningi.id_treningu = wyniki.id_treningu
                             WHERE uzytkownicy.id_uzytkownika='$user_id' AND treningi.data_treningu BETWEEN '$start_date' AND '$end_date'
                            ORDER BY treningi.data_treningu DESC;";
                        $result = mysqli_query($conn, $sql);

                        $data = array();

                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $data[] = $row;
                            }
                            echo json_encode($data);
                        } else {
                            echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                        }


                    } else {
                        echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));

                    }
                } else {
                    echo json_encode(array('message' => 'Żądanie wymaga autoryzacji.', 'code' => '401'));
                }
                break;
            case 'gettraininginfo':
                if (isAuth()) {
                    if (isset($_POST['training_id'])) {
                        $training_id = $_POST['training_id'];

                        $training_id = $_POST['training_id'];
                        $sql = "SELECT uzytkownicy.id_uzytkownika, uzytkownicy.imie, uzytkownicy.nazwisko, wyniki.punkty, wyniki.dziesiatki, wyniki.uwagi
                                FROM uzytkownicy INNER JOIN (treningi INNER JOIN wyniki ON treningi.id_treningu = wyniki.id_treningu) ON uzytkownicy.id_uzytkownika = wyniki.id_uzytkownika
                                WHERE treningi.id_treningu = '$training_id';";
                        $result = mysqli_query($conn, $sql);

                        $data = array();

                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $data[] = $row;
                            }
                            echo json_encode($data);
                        } else {
                            echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                        }


                    } else {
                        echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));

                    }
                } else {
                    echo json_encode(array('message' => 'Żądanie wymaga autoryzacji.', 'code' => '401'));
                }
                break;
            case 'createtraining':
                if (isAuth() && isAdmin()) {
                    if (isset($_POST['date'])) {
                        //format daty '2023-04-22'  

                        $date = $_POST['date'];

                        $sql = "INSERT INTO treningi VALUES(null,'$date');";
                        $result = mysqli_query($conn, $sql);

                        if ($result) {
                            echo json_encode(array('message' => 'Trening utworzyony pomyślnie.', 'code' => '200'));
                        } else {
                            echo json_encode(array('message' => 'Nie udało się stworzyć treningu.', 'code' => '400'));

                        }



                    } else {
                        echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));

                    }
                } else {
                    echo json_encode(array('message' => 'Żądanie wymaga autoryzacji.', 'code' => '401'));
                }
                break;
            case 'updateresult':
                if (isAuth() && isAdmin()) {
                    if (isset($_POST['training_id']) && isset($_POST['user_id']) && isset($_POST['points']) && isset($_POST['tens']) && isset($_POST['note'])) {
                        $training_id = $_POST['training_id'];
                        $user_id = $_POST['user_id'];
                        $points = $_POST['points'];
                        $tens = $_POST['tens'];
                        $note = $_POST['note'];

                        $sql = "SELECT * FROM `wyniki` WHERE id_treningu='$training_id' AND id_uzytkownika='$user_id'";
                        $result = mysqli_query($conn, $sql);

                        if ($result) {
                            //update
                            $query = "UPDATE wyniki SET id_treningu='$training_id', id_uzytkownika='$user_id', punkty='$points', dziesiatki='$tens', uwagi='$note' WHERE id_treningu = '$training_id' AND id_uzytkownika='$user_id'";
                            $res = mysqli_query($conn, $query);

                            echo json_encode(array('info' => $res, 'message' => 'Zaaktualizowano wyniki.', 'code' => '200'));

                        } else {
                            //create
                            $query = "INSERT INTO wyniki (id_treningu, id_uzytkownika, punkty, dziesiatki, uwagi) 
                                 VALUES ('$training_id','$user_id','$points','$tens','$note')";
                            $res = mysqli_query($conn, $query);


                            echo json_encode(array('info' => $res, 'message' => 'Dodano wyniki.', 'code' => '200'));

                        }



                    } else {
                        echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));

                    }
                } else {
                    echo json_encode(array('message' => 'Żądanie wymaga autoryzacji.', 'code' => '401'));
                }
                break;





            default:
                echo json_encode(array('message' => 'Nieznane żądanie.', 'code' => '404'));
                break;
        }
    } else {
        echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));
    }
} else {
    echo json_encode(array('message' => 'Nieprawidłowa metoda żądania.', 'code' => '405'));
}

?>