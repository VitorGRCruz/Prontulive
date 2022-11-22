function reqt() {
    let reqt = document.getElementById('r1');
    let pac = document.getElementById('p2');
    let reqs = document.getElementById('r3');
    let dec = document.getElementById('d4');
    dec.style.display = 'none';
    pac.style.display = 'none';
    reqs.style.display = 'none';
    reqt.style.display = 'inline';
}
function pac() {
    let reqt = document.getElementById('r1');
    let pac = document.getElementById('p2');
    let reqs = document.getElementById('r3');
    let dec = document.getElementById('d4');
    dec.style.display = 'none';
    reqt.style.display = 'none';
    reqs.style.display = 'none';
    pac.style.display = 'inline';
}
function reqs() {
    let reqt = document.getElementById('r1');
    let pac = document.getElementById('p2');
    let reqs = document.getElementById('r3');
    let dec = document.getElementById('d4');
    dec.style.display = 'none';
    reqt.style.display = 'none';
    pac.style.display = 'none';
    reqs.style.display = 'inline';

}
function dec() {
    let reqt = document.getElementById('r1');
    let pac = document.getElementById('p2');
    let reqs = document.getElementById('r3');
    let dec = document.getElementById('d4');
    reqt.style.display = 'none';
    pac.style.display = 'none';
    reqs.style.display = 'none';
    dec.style.display = 'inline';
    dec.style.alignSelf = 'center';

}
function dados(id, consulta) {
    idR = id;
    let dados = new FormData();
    dados.append('idR', id);
    dados.append('flag', 1);

    const config = {
        method: 'POST',
        body: dados
    };

    fetch('http://localhost/site/src/config/requisicao.php', config)
        .then((response) => {
            return response.json();

        })
        .then((json) => {
            var [data, hora] = json[0].data_hora.split(' ');
                var [ano, mes, dia] = data.split('-');
                const datahora = dia + "/" + mes + "/" + ano + " " + hora;

            if (consulta == 1) {
                document.getElementById('nomeR').innerText = json[0].nomeR;
                document.getElementById('cpfR').innerText = json[0].cpfR;
                var [ano, mes, dia] = json[0].data_nascR.split('-');
                const data_nascR = [dia, mes, ano].join('/');
                document.getElementById('data_nascR').innerText = data_nascR;
                document.getElementById('telefone').innerText = json[0].telefone;
                document.getElementById('email').innerText = json[0].email;
                var endereco = json[0].endereco.replace(/__/g, ', ');
                document.getElementById('endereco').innerText = endereco;
                document.getElementById('nomeP').innerText = json[0].nomeP;
                document.getElementById('cpfP').innerText = json[0].cpfP;
                var [ano, mes, dia] = json[0].data_nascP.split('-');
                const data_nascP = [dia, mes, ano].join('/');
                document.getElementById('data_nascP').innerText = data_nascP;
                var [ano, mes, dia] = json[0].data_atendimento.split('-');
                const data_atendimento = [dia, mes, ano].join('/');
                document.getElementById('data_atendimento').innerText = data_atendimento;
                var [ano, mes, dia] = json[0].data_alta.split('-');
                const data_alta = [dia, mes, ano].join('/');
                document.getElementById('data_alta').innerText = data_alta;
                document.getElementById('finalidade').innerText = json[0].finalidade;
                document.getElementById('button2').href = '../../../apireactnative' + json[0].arquivo_autorizacao;
                
                document.getElementById('data_hora').innerText = datahora;
            }
            else if (consulta == 2) {
                document.getElementById('customers').style.display = 'none';
                var status;
                var obs;
                switch (json[0].status) {
                    case '1': status = 'Análise Administrativa';
                            break;
                    case '2': status = 'Análise Júridica';
                            break;
                    case '3': status = 'Requisição Aceita';
                            break;
                    case '4': status = 'Solicitação recusada ';
                            break;
                    case '5': status = 'Solicitação recusada ';
                            break;
                    default:
                            console.log("Sem status definido");
                            break;
            }
            switch (json[0].observacao) {
                    case null: obs = 'Sem anotações no momento';
                            break;
                    default: obs = json[0].observacao;
                            break;

            }
            var [ano, mes, dia] = json[0].data_alta.split('-');
            const data_alta = [dia, mes, ano].join('/');
            var [ano, mes, dia] = json[0].data_atendimento.split('-');
            const data_atendimento = [dia, mes, ano].join('/');
                document.getElementById('div-busca').innerHTML = `

                <div class="div-dados"><Text class="dados-index">Nome do Requisitante:</Text>
                        <Text class="dados-item">`+ json[0].nomeR + `</Text>
                </div>
                <div class="div-dados"><Text class="dados-index">CPF do Requisitante:</Text>
                        <Text class="dados-item">`+ json[0].cpfR + `</Text>
                </div>
                <div class="div-dados"><Text class="dados-index">Nome do Paciente:</Text>
                        <Text class="dados-item">`+ json[0].nomeP + `</Text>
                </div>
                <div class="div-dados"><Text class="dados-index">CPF do Paciente:</Text>
                        <Text class="dados-item">`+ json[0].cpfP + `</Text>
                </div>

                <div class="div-dados"><Text class="dados-index">Andamento da Requisição:</Text>
                        <Text class="dados-item">`+ status + `</Text>
                </div>

                <div class="div-dados"><Text class="dados-index">Observação:</Text>
                        <Text class="dados-item">`+ obs + `</Text>
                </div>
                
                <div class="div-dados"><Text class="dados-index">Data Atendimento:</Text>
                        <Text class="dados-item">`+ data_atendimento + `</Text>
                </div>

                <div class="div-dados"><Text class="dados-index">Data Alta:</Text>
                        <Text class="dados-item">`+ data_alta + `</Text>
                </div>

                <div class="div-dados"><Text class="dados-index">FINALIDADE :</Text>
                        <Text class="dados-item">`+ json[0].finalidade + `</Text>
                </div>

                <div class="div-dados"><Text class="dados-index">Horário da solicitação:</Text>
                        <Text class="dados-item">`+ datahora + `</Text>
                </div>

                <div class="div-dados">
                        <Text class="dados-index">Arquivos de autorização:</Text>
                        <a type="button" class="button fas fa-download " id="button2"  href='../../../apireactnative`+json[0].arquivo_autorizacao+`' 
                         download>Clique Aqui</a>
                </div>


                   

                `;



            }




        })
        .catch(() => {

            alert("erro");
        })
    if (consulta == 1) {
        reqt();
    }

}


function confirmar(tipo) {
    var res = confirm("Deseja aceitar a requisição?");



    if (tipo == 'JUR') {
        if (res) {
            document.getElementById('aceitar').style.display = 'none';
            document.getElementById('REJ').style.display = 'none';
            document.getElementById('txt_prontuario').style.display = 'inline';
            document.getElementById('inpFile').style.display = 'inline';
            document.getElementById('pross').style.display = 'inline';
            document.getElementById('volt').style.display = 'inline';

        }
    }
    else if (tipo == 'ADM' || tipo == 'SUPER') {
        if (res) {
            Prosseguir(tipo);
        }
    }

}

function Voltar() {
    document.getElementById('aceitar').style.display = 'inline';
    document.getElementById('REJ').style.display = 'inline';
    document.getElementById('txt_prontuario').style.display = 'none';
    document.getElementById('inpFile').style.display = 'none';
    document.getElementById('pross').style.display = 'none';
    document.getElementById('volt').style.display = 'none';
}


function Prosseguir(tipo) {

    var res2 = confirm("Deseja Continuar?");

    if (res2) {

        if (tipo == "ADM" || tipo == 'SUPER') {
            let status = new FormData();
            status.append('flag', 2);
            status.append('idR', idR);

            const editarStatus = {
                method: 'POST',
                body: status
            };


            fetch('http://localhost/site/src/config/requisicao.php', editarStatus)
                .then((response) => {
                    return response.text();

                })
                .then((json) => {
                    console.log(json);
                })


        }
        else if (tipo == "JUR") {

            const myForm = document.getElementById("myForm");
            const inpFile = document.getElementById("inpFile");
            let status = new FormData();
            status.append("inpFile", inpFile.files[0]);
            status.append('flag', 3);
            status.append('idR', idR);

            const editarStatus = {
                method: 'POST',
                body: status
            };


            fetch('http://localhost/site/src/config/requisicao.php', editarStatus).
                then((response) => {
                    return response.text();

                })
                .then((json) => {
                    console.log(json);
                })

        }

        alert("Requisição aceita com sucesso !");

        window.location.reload();
    }

};

function rejeitar(tipo) {
    var res = confirm("Deseja rejeitar a requisição?");

    if (res == true) {
        var desc = prompt("Motivo da recusa de requisição:");
        if (desc != null) {

            if (tipo == 'ADM' || tipo == 'SUPER') {

                let obs = new FormData();
                obs.append('obs', desc);
                obs.append('flag', 4);
                obs.append('status', 4);
                obs.append('idR', idR);

                const addObs = {
                    method: 'POST',
                    body: obs
                };
                fetch('http://localhost/site/src/config/requisicao.php', addObs).
                    then((response) => {
                        return response.text();

                    })
                    .then((json) => {
                        console.log(json);

                    });
                alert('Requisição Rejeitada !');
            }

            else if (tipo == 'JUR') {
                let obs = new FormData();
                obs.append('obs', desc);
                obs.append('flag', 4);
                obs.append('status', 5);
                obs.append('idR', idR);

                const addObs = {
                    method: 'POST',
                    body: obs
                };
                fetch('http://localhost/site/src/config/requisicao.php', addObs).
                    then((response) => {
                        return response.text();

                    })
                    .then((json) => {
                        console.log(json);
                    }); alert('Requisição Rejeitada !');
            }
            window.location.reload();
        }

    }
};

