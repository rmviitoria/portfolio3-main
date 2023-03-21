var botVer = document.getElementById('verificar');
var botlimpa = document.getElementById('limpar');
var botVolta = document.getElementById('voltar');

var campoNome = document.getElementById('nome');
var campoData = document.getElementById('data_nascimento');
var campoAltura = document.getElementById('altura');
var campoPeso = document.getElementById('peso');
var sexos = document.querySelectorAll('input[name="sexo"]');

botVer.addEventListener('click', function () {

    var nome = campoNome.value;
    var peso = campoPeso.value;
    var altura = campoAltura.value;
    var sexoSelecionado;
    for (var i = 0; i < sexos.length; i++) {
        if (sexos[i].checked) {
            sexoSelecionado = sexos[i].value;
            break;
        }
    }
    var data = new Date(campoData.value);
    var dataAtual = new Date();
    dataAtual.getUTCHours(12);
    var dia = data.getUTCDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    var anoAtual = dataAtual.getFullYear();
    var imc = peso / (altura * altura);

    if (sexoSelecionado == 'Masculino') {
        alert(`Sr. ${nome}  você nasceu no ano de ${ano},
        você tem ${anoAtual - ano}
        anos de idade e seu imc é de ${(imc.toFixed(2))}`)
    } else {
        alert(`Sra. ${nome}  você nasceu no ano de ${ano},
        você tem ${anoAtual - ano}
        anos de idade e seu imc é de ${(imc.toFixed(2))}`)
    }
}
)

