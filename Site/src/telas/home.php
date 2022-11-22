<!DOCTYPE html>
<?php

session_start();
if (!isset($_SESSION['login'])) {
    header('location:index.php');
}

include '../config/menu.php';
?>

<html>

<head>
    <meta charset="UTF-8">
    <title>Prontulive</title>
    <link rel="stylesheet" type="text/css" href="../estilos/estilos.css">
    <link href="../estilos/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    

</head>

<body class="container">

    <ul>
        <?php menu('home') ?>
    </ul>

    <img src="../assets/imagens/Logo.png" class="img" alt="...">

    <?php
    include '../config/db.php';
    echo '<Text>BEM-VINDO ' . $_SESSION['login_nome'] . '</Text>';
    echo '<a href ="?pagina=requisicoes" class="button button1">
        ' . $_SESSION['qtd_requisicoes'] . ' Requisições em aberto</a> ';
    ?>
    <?php if($_SESSION['login_tipo'] == 'SUPER'){
       echo '<a class="button button1" data-bs-toggle="modal" data-bs-target="#busca">Pesquisar Requisições</a>'; } ?>

    <!-- Modal -->
    <div class="modal fade " id="busca" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="TituloModalLongoExemplo" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <Text> Buscar Requisição </Text>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="fechar"></button>
                </div>

                <div>
                <form id="form-busca" style ="display:flex;justify-content:flex-start;margin:2vh;flex-direction:column;width: 40%" method="post" onsubmit="event.preventDefault();buscar();">
                    <label class="labelss"> Nome do Paciente</label>    
                    <input class="inputss placeholder-text " placeholder="Digite o nome" id="input" type="text" name="search">
                    <div>
                     <label class="labelss"> Status da Requisição</label>
                        <select name="status" id="select-busca" class="inputss">
                        <option value="0">Todas Requisições</option>
                        <option value="1">Análise Administrativa</option>
                        <option value="2">Análise Júridica</option>
                        <option value="3">Requisição Aceita</option>
                        <option value="4">Recusada Pelo Administrativo</option>
                        <option value="5">Recusada Pelo Júridico</option>
                        </select>
                    <i id="btn-busca" class="fa fa-search fa-lg"></i>
                    </div>
                       
                        
                    </form>

                    <div style="display:none;" id="div-busca"></div>
                </div>

            </div>
        </div>
    </div>
    <!-- Modal -->


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="../estilos/js/bootstrap.min.js"></script>
    <script src="../config/search.js"></script>
    <script src="../config/modalReq.js"></script>
</body>

</html>