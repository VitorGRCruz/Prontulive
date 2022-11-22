

const reload_search = document.getElementById("fechar");
reload_search.addEventListener("click", function (e) {
    window.location.reload();
});

const busca2 = document.getElementById("busca");
busca2.addEventListener("keypress", function (e) {
    buscar();
});
const busca3 = document.getElementById("btn-busca");
busca3.addEventListener("click", function (e) {
    buscar();
});


function buscar() {
    document.getElementById('div-busca').style.display = 'inline';

    var result = document.querySelectorAll(".result");
    if(result!=null){
        var lista = document.getElementsByClassName('result');
        for(var i = lista.length - 1; i >= 0; i--){   
            lista[i].remove()
        }} 


    var input = document.querySelector("#input");
    var select = document.querySelector("#select-busca");
    let busca = new FormData();
    busca.append('busca', input.value);
    busca.append('status', select.value);
    
    const buscar_requisicao = {
        method: 'POST',
        body: busca
    };
    fetch('http://localhost/site/src/config/pesquisar_requisicoes.php', buscar_requisicao).
        then((response) => {
            return response.json();

        })
        .then((json) => {
            if(json.length == 0){
                document.getElementById('div-busca').innerHTML = "<Text id='text_vazio'>Nenhuma Requisição encontrada</Text>";

            }
            else {
                document.getElementById('div-busca').innerHTML = `<table id='customers'>
                <tr id='tabela-busca'><th>Nome do Paciente
                </th><th>Nome do Requisitante</th><th>Data da requisição</th></tr></table>`;
     
            var i = 0;
            var html_atual = document.getElementById('customers');

            while (i < json.length) {
                var [data, hora] = json[i].data_hora.split(' ');
                var [ano, mes, dia] = data.split('-');
                var datahora = dia + "/" + mes + "/" + ano + " " + hora;

                html_atual.innerHTML = html_atual.outerHTML + "<tr class='result' onclick=\'dados(" + json[i].idR + "," + 2 + ")\'><td>" + json[i].nomeP
                    + "</td><td>" + json[i].nomeR + "</td><td>" + datahora + "</td></tr>";     
                  
            
                i++;
            }}
         
        }).catch(() => {

            alert("erro");
        })
}