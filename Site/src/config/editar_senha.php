<?php

include './db.php';

$senha_atual = md5($_POST['senhaatual']);

session_start();
if($senha_atual  == $_SESSION['senha']){
    $s1 = $_POST['novasenha'];
    $s2 = $_POST['confirmasenha'];
    $id = $_SESSION['login'];
    if($s1 == $s2) {
        $s1 = md5($s1);
        $query="UPDATE usuario SET senha_md5 = '$s1' WHERE usuario.pessoa_id = $id;";
        mysqli_query($conexao,$query);
        $_SESSION['senha'] = $s1;
        header('location:index.php?pagina=dadospessoais&sucess');
    }
    else{
        header('location:index.php?pagina=dadospessoais&erro1');
    } 
}
else{
    header('location:index.php?pagina=dadospessoais&erro2');
}

