<?php

include './db.php';

$nome = $_POST['nome'];
$cpf = $_POST['cpf'];
    list($d, $m, $Y) = explode("/", $_POST['data_nasc']);
        $format_data = $m . '/' . $d . '/' . $Y;
$data_nasc = date('Y-m-d', strtotime($format_data));
$tipo_u = $_POST['tipo_u'];
$s1 = $_POST['senha'];
$s2 = $_POST['confirmasenha'];

if($s1 == $s2) {
$senha = md5($_POST['senha']);

$query ="INSERT INTO pessoa(nome,cpf,data_nasc) VALUES ('$nome', '$cpf', '$data_nasc')";
mysqli_query($conexao,$query);

$query = "SELECT id FROM pessoa WHERE cpf = '$cpf'";
$cadastro_usuario_id = mysqli_query($conexao,$query);
$obj = $cadastro_usuario_id->fetch_object();

$query = "INSERT INTO usuario(pessoa_id,senha_md5) VALUES ($obj->id,'$senha')";
mysqli_query($conexao,$query);

if($tipo_u == 'JUR'){
    $query = "INSERT INTO usuario_juridico(pessoa_id) VALUES ($obj->id)";
    mysqli_query($conexao,$query);
}
else if($tipo_u == 'ADM'){
    $query = "INSERT INTO usuario_administrativo(pessoa_id, adm_geral) VALUES ($obj->id, 0)";
    mysqli_query($conexao,$query);
}
else if($tipo_u == 'SUPER'){
    $query = "INSERT INTO usuario_administrativo(pessoa_id, adm_geral) VALUES ($obj->id, 1)";
    mysqli_query($conexao,$query);
}

header('location:index.php?pagina=cadastro&sucess');

}

else{
    header('location:index.php?pagina=cadastro&erro3');
} 

