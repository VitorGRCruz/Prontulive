



    <?php
    function menu($pagina)
    {
        if ($pagina == 'home') {
            echo ' <li><a class="active" href="?pagina=home">Ínicio</a></li>';
        } else {

            echo ' <li><a  href="?pagina=home">Ínicio</a></li>';
        }
        if ($pagina == 'requisicoes') {
            echo ' <li><a class="active" href="?pagina=requisicoes">Requisições</a></li>';
        } else {

            echo '<li><a  href="?pagina=requisicoes">Requisições</a></li>';
        }
        if ($pagina == 'dadospessoais') {
            echo ' <li><a class="active" href="?pagina=dadospessoais">Dados Pessoais</a></li>';
        } else {

            echo '<li><a  href="?pagina=dadospessoais">Dados Pessoais</a></li>';
        }
        if($_SESSION['login_tipo']=='SUPER'){
            if ($pagina == 'cadastro') {
                echo ' <li><a class="active" href="?pagina=cadastro">Cadastro</a></li>';
            } else {
    
                echo '<li><a  href="?pagina=cadastro">Cadastro</a></li>';
            }
        }
        echo '<li style="float: right;"><a href="../config/logout.php">Sair</a></li>';
    }
    
    ?>

