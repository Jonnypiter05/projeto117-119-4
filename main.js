function preload(){
    classifier = ml5.imageClassifier('DoodleNet')
}
function setup() 
{
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);//esse comando de codigo chama a função classify,essa fução é acionado quando o usuario clica na tela e libera i click do mouse//
    synth = window.SpeechSynthesis;
}

function clearCanvas(){
    background("white");
}
function draw(){

    //define strokeWeight como 13//
    strokeWeight(13);
    //define a cor do stroke como preto//
    stroke(0);
    //Se o mouse for clicado,desenhe uma linha entre a posição antiga e atual do mouse//
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}
function gotResult(erro, results)
{
if (error) {
    console.error(error);
}
console.log(results);
var result = result[0].label;
document.getElementById('label').innerHTML = 'Nome: ' + result.replace('_', ' ');



document.getElementById('confidence').innerHTML = 'Precisão: '
                                            + Math.round(results[0].confidence * 100) + '%';

utterThis = new SpeechSynthesisUtterance(result.replace('_', ' '));
synth.speak(utterThis);

}