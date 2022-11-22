<?php

include 'db.php';

$cpf = addslashes($_POST['cpf']);
$senha = md5($_POST['senha']);
$query = "SELECT id,nome,cpf,data_nasc,senha_md5 FROM pessoa, usuario WHERE usuario.pessoa_id = pessoa.id and cpf = '$cpf' and senha_md5 = '$senha'";
$rs = mysqli_query($conexao, $query);
$obj = $rs->fetch_object();


$linha = mysqli_num_rows($rs);

if ($linha != 0) {
    $id = $obj->id;
    $nome = $obj->nome;
    $cpf = $obj->cpf;
    $data_nasc = $obj->data_nasc;
    $LIST = explode("-", $data_nasc);
    $format_data = $LIST[2] . '/' . $LIST[1] . '/' .$LIST[0];

    $senha = $obj->senha_md5;

    $query_tipo = "SELECT tipo_usuario from VUsuario where $id = id;";
    $rs_tipo = mysqli_query($conexao, $query_tipo);
    $obj_tipo = $rs_tipo->fetch_object();
    $tipo = $obj_tipo->tipo_usuario;

    if ($tipo == 'BLOQ') {
        header('location:index.php?erro2');
    } else {
        session_start();
        $_SESSION['login'] = $id;
        $_SESSION['login_tipo'] = $tipo;
        $_SESSION['login_nome'] = $nome;
        $_SESSION['login_cpf'] = $cpf;
        $_SESSION['login_dataNasc'] = $format_data;
        $_SESSION['senha'] = $senha;

        header('location:index.php?pagina=home');
    }
} else {
    header('location:index.php?erro1');
}
