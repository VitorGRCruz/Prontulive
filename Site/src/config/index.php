<?php



if(isset($_GET['pagina'])){
$pagina = $_GET['pagina'];
}
else{
    $pagina = 'telalogin';
}



switch($pagina){
    case 'cadastro' :  include '../telas/cadastro.php'; break;
    case 'home' :  include '../telas/home.php'; break;
    case 'requisicoes' :  include '../telas/requisicoes.php'; break;
    case 'dadospessoais' :  include '../telas/dadospessoais.php'; break;
    default: include '../telas/telalogin.php'; break;
}

