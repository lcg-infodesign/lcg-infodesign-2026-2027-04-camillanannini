let myTable;
let mioFont;
let regioni = [
  "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", 
  "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", 
  "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", 
  "Toscana", "Trentino-Alto Adige \n/ Südtirol", "Umbria", "Valle d'Aosta \n/ Vallée d'Aoste", "Veneto"
]; //in questo array dico solo quali regioni mi interessa siano usate (ad esempio non "sud" o "centro")

let regioneCliccata; //variabile che memorizza il nome della regione su cui si trova il mouse a un certo momento

async function setup() {
  createCanvas(windowWidth, windowHeight);
  myTable= await loadTable("assets/distribuzione_acqua.csv", ",", "header");
  mioFont= await loadFont("assets/din.ttf");
}

function draw() {
  background(224, 224, 224);
  
  regioneCliccata= ""; //a ogni giro la variabile viene azzerata, sennò verrebbe memorizzata la regione precedente

//testo
  push();
  strokeWeight(1);
  stroke(64,64,64);
  fill(190, 105, 20);
  textSize(46);
  textAlign(CENTER, CENTER);
  textFont(mioFont);
  
  text("Acqua erogata e immessa negli impianti idrici \nin ogni regione d'Italia nel 2022", width/2, 340);

  textSize(28);
  textFont(mioFont);
  textAlign(CENTER, CENTER);
  text("Clicca su una valvola rossa\nper scoprire i dati della regione", width/2, 460);
  pop();

  //tubi
  let xMargine=0;
  let yBase1= 180;  
  let yBase2=600;
  
  stroke(40);
  strokeWeight(1.5);
  fill(64, 64, 64); 
  rect(xMargine, yBase1, windowWidth, 50);
  rect(xMargine, yBase2, windowWidth, 50);



  let spaziaturaX= windowWidth / 10; 
  let posX=0; 
  

  for (let numRegione= 0; numRegione < regioni.length; numRegione++) {
    let nomeRegione=regioni[numRegione];


    let yBase=yBase1; //parte dal presupposto che ogni regione che disegna, ha come yBase la yBase1
    if (numRegione === 10) {
      posX=0; 
      yBase= yBase2; //se il numero della regione è esattamente 10, allora la pos x si azzera e i disegni ripartono da sinistra e si cambia l'altezza della yBase a yBase2
    } else if (numRegione > 0) {
      posX=posX + spaziaturaX; 
    } //se invece la regione non è esattamente 10, allora controlla che sia maggiore di zero e quindi fa sì che il rubinetto vada più a destra aggiungendo la spaziatura
    
    if (numRegione >= 10) {
      yBase= yBase2; 
    } //quando il numero della regione diventa maggiore o uguale a dieci, la ybase è yBase2
    

    //posizione valvola cliccabile
    let valvolaX = posX + 55.5;
    let valvolaY = yBase - 23;

    if (dist(mouseX, mouseY, valvolaX, valvolaY) < 15) {
      regioneCliccata = nomeRegione;
    } //se la distanza tra le coordinate del mouse e il centro della valvola è minore di 15 (sennò bisognerebbe cliccare esattamente sul centro)
    //allora la regione cliccata viene associata a quella con variabile nome regione
    

    //disegno rubinetti
    push();
    fill(32, 32, 32);
    noStroke();
    rect(posX + 40.5, yBase - 15.5, 30, 16);
    rect(posX + 48.5, yBase - 25, 15, 10);

    fill(204, 0, 0);
    noStroke();
    rect(posX + 35, yBase - 36, 14, 10);
    ellipse(posX + 36, yBase - 31, 10);
    rect(posX + 60, yBase - 36, 14, 10);
    ellipse(posX + 75, yBase - 31, 10);

    fill(64, 64, 64);
    noStroke();
    rect(posX + 46, yBase + 50, 20, 16, 2);
    fill(32, 32, 32);
    rect(posX + 44.5, yBase + 60, 23, 4, 2);
    rect(posX + 42.3, yBase + 63, 28, 8, 2);
   
    

    stroke(102, 0, 0);
    strokeWeight(0.5);
    fill(204, 0, 0);
    ellipse(posX + 55.5, yBase - 32, 20);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(32, 32, 32); 
    rect(posX + 28, yBase-2, 12, 54);
    rect(posX + 71, yBase-2, 12, 54);
    

    pop();

    

    //nomi regioni sopra
    push();
    fill(0, 76, 152);               
    noStroke();
    textSize(16);
    textFont(mioFont);
    textAlign(CENTER, BOTTOM);
    text(nomeRegione, posX + 55.5, yBase - 50);
    pop();
  } 
}

function mousePressed() {
  if (regioneCliccata) {
    nomeRegione= "detail.html?regione=" + regioneCliccata;
    window.location.href = nomeRegione;
  }
} //se la variabile regione cliccata è piena, allora va ala pagina corrispondente

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
