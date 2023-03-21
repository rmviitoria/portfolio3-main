var box = window.document.getElementById("box");
var box1 = window.document.getElementById("box1");
var sBruto = 0;
var depende = 0;
var vale = 0;
var calc = window.document.getElementById("calc");
var reset = window.document.getElementById("reset");
var func = 0;
var inssFinal = 0;
var irrfFinal = 0;
var sInss = 0;
var sLiquido = 0;
//BOTOES DE CALCULAR
calc.addEventListener("click", abrir);
calc.addEventListener("click", calcular);
reset.addEventListener("click", fechar);

//FUNCOES
function abrir() {
	//Surgir a box de resultados
	box1.style.display = "block";
	box1.style.width = "auto";
	box1.style.backgroundColor = "rgba(65,65,65,0.6)";
	box1.style.height = "auto";
	box1.style.padding = "50px";
	box1.style.borderRadius = "30px";
	box1.style.fontSize = "22px";
	box1.style.lineHeight = "170%";
	box1.style.transitionDuration = "1s";
	sBruto = Number(document.querySelector("#salarioBruto").value);
	depende = document.getElementById("dependentes").value;
	vale = document.getElementById("vale");
}
function calcular() {
//calculo inss:
if (sBruto < 1302.00){
    inssFinal = sBruto*0.075
    sInss = sBruto - inssFinal
    
}
else if (1302.01 < sBruto && sBruto < 2571.29){
    inssFinal = sBruto*0.09
    sInss = sBruto - inssFinal
}
else if (2571.30 < sBruto && sBruto < 3856.94){
    inssFinal = sBruto*0.12
    sInss = sBruto - inssFinal
}
else if (3856.95 < sBruto && sBruto < 7507.49){
    inssFinal = sBruto*0.14
    sInss = sBruto - inssFinal
}
else if (sBruto > 7507.49){
    inssFinal = 7507.49*0.14
    sInss = sBruto - inssFinal
}
//calculo irrf:
if (sInss < 1903.98){ 
    console.log("isento de irrf")
}
else if(1903.99 < sInss && sInss < 2826.65){
    deduzido = sInss-(142.80+(depende*189.59))
    irrfFinal = deduzido*0.075
}
else if(2826.66 < sInss && sInss < 3751.05){
    deduzido = sInss-(354.80+(depende*189.59))
    irrfFinal = deduzido*0.15
}
else if(3751.06 < sInss && sInss < 4664.68){
    deduzido = sInss-(636.13+(depende*189.59))
    irrfFinal = deduzido*0.225
}
else if(sInss > 4664.68){
    deduzido = sInss-(869.36+(depende*189.59))
    irrfFinal = deduzido*0.275
}
//calculo vale transporte:
if(vale.checked){
	var vtFinal = sBruto * 0.06
}
else{
    var vtFinal = sBruto * 0
}



//calculo liquido
sLiquido = sBruto - (inssFinal + (irrfFinal + vtFinal))
console.log(sBruto, inssFinal, irrfFinal,vtFinal, sLiquido)
document.getElementById('sB').innerHTML = sBruto.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
document.getElementById('INSS').innerHTML = inssFinal.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
document.getElementById('IRFF').innerHTML = irrfFinal.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
document.getElementById('Vt').innerHTML = vtFinal.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
document.getElementById('sL').innerHTML = sLiquido.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
}

function fechar() {
	//Fechar a box de resultados
	box1.style.display = "none";
	box1.style.transitionDuration = "1s";
	func = 0;
	inssFinal = 0;
	irrfFinal = 0;
	sInss = 0;
	sLiquido = 0;
	sBruto = 0;
	depende = 0;
	vale = 0;
}