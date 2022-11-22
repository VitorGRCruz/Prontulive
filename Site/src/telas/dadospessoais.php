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
    <title>Dados Pessoais</title>
    <link rel="stylesheet" type="text/css" href="../estilos/estilos.css">
    <link href="../estilos/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="container">
    <ul>
        <?php menu('dadospessoais') ?>
    </ul>

    <img src="../assets/imagens/Logo.png" class="img" alt="...">
    <div style="width: 30%;">
        <div id="campos">
            <Text>Dados Pessoais</Text>
            <div>
            
            <?php
            echo '<div id="div-dados"><Text class="dados-index">Nome:</Text>
                    <Text class="dados-item">' . $_SESSION['login_nome'] . '</Text></div>';
            echo '<div id="div-dados"><Text class="dados-index">CPF:</Text>
                    <Text class="dados-item">' . $_SESSION['login_cpf'] . '</Text></div>';
            echo '<div id="div-dados"><Text class="dados-index">Data de Nascimento:</Text>
                    <Text class="dados-item">' .$_SESSION['login_dataNasc']. '</Text></div>';
            echo '<div id="div-dados"> <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="button" id="button2"> Editar Senha</button> </div>';
            ?>
            </div>
            


            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <form class="modal-content" method="post" action="editar_senha.php">
                        <div class="modal-header">
                            <Text> Alteração de Senha </Text>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-edit-senha">
                            <div class="label-input input-cadastro">

                                <label class="labelss"> Senha Atual</label>
                                <input  name="senhaatual" placeholder="Digite a senha atual" type="password" class="inputss placeholder-text">

                                <label class="labelss"> Nova Senha</label>
                                <input  name="novasenha" placeholder="Escolha uma nova Senha" type="password" class="inputss placeholder-text">

                                <label class="labelss"> Confirme a Senha</label>
                                <input  name="confirmasenha" placeholder="Digite a Senha novamente" type="password" class="inputss placeholder-text">
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="button button3" data-bs-dismiss="modal">Voltar</button>
                            <button class="button" id="button2">Editar</button>

                        </div>

                    </form>
                </div>
            </div>
            <!-- / Modal -->

        </div>
    </div>

    <?php if (isset($_GET['sucess'])) { ?>
        <div class="alert sucess" role="alert">
            SENHA ALTERADA COM SUCESSO !
        </div>
    <?php  } else if (isset($_GET['erro1'])) { ?>
        <div class="alert erro" role="alert">
            Confirmação da senha incorreta !
        </div>
    <?php } else if (isset($_GET['erro2'])) { ?>
        <div class="alert erro" role="alert">
            Senha atual inválida !
        </div>
    <?php } ?> 


    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="../estilos/js/bootstrap.min.js"></script>
    
</body>

</html>