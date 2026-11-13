let myTable;
let mioFont;
let regioneSelezionata = "";
let acquaImmessa = 0; //metto a 0 le variabile che mi servono per questi determinati dati
let acquaErogata = 0;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  myTable = await loadTable("assets/distribuzione_acqua.csv", ",", "header");
  mioFont = await loadFont("assets/din.ttf");

  
  let params = getURLParams(); //con getURLParams, il programma prende dall'url la regione
  regioneSelezionata = decodeURIComponent(params.regione); // qui dico che la regione selezionata è il valore associato alla parola regione nell'URL

  //cerco i dati nel dataset
   for (let r = 0; r < myTable.getRowCount(); r++) { //con questo ciclo leggo le righe del dataset una per una
    let territorio = myTable.getString(r, "Territorio");
    let anno = myTable.getNum(r, "TIME_PERIOD");
    let descrizione = myTable.getString(r, "Indicatore"); //per ogni riga gli dico di considerare i valori associati alla scritta terriitorio, time period e indicatore

    if (territorio === regioneSelezionata && anno === 2022) { //se il territorio corrisponde giustamente alla regione selezionata e l'anno è il 2022
      if (descrizione.includes("immessa")) { //allora va a vedere se la descrizione include la parola "immessa"
        acquaImmessa = myTable.getNum(r, "Osservazione"); //se sì, la variabile acquaimmessa corrisponde al valore "osservazione" nel datase
      } else if (descrizione.includes("erogata")) { //invece se la descrizione include la parola "erogata"
        acquaErogata = myTable.getNum(r, "Osservazione"); //allora la variabile acquaerogata corrisponde al valore osservazione nel dataset
      }
    }
  }
}

function draw() {
  background(224, 224, 224);

  //nome della regione
  push();
  fill(190, 105, 20);
  textSize(50);
  stroke(64,64,64);
  strokeWeight(1);
  textFont(mioFont);
  textAlign(CENTER, CENTER);
  text(regioneSelezionata, width/2, 48);
  pop();


  //altezza e larghezza dei box
  let larghezzaBox = (windowWidth - 120)/2;
  let altezzaBox = windowHeight - 140;

 //box sinistra
  let xBox1 = 40;
  let yBox1 = 90;

  push();
  fill(255);
  stroke(200);
  strokeWeight(2);
  rect(xBox1, yBox1, larghezzaBox, altezzaBox, 10);

  noStroke();
  fill(64, 64, 64);
  textSize(22);
  textFont(mioFont);
  textAlign(CENTER, TOP);
  text("Acqua Immessa", xBox1 + larghezzaBox / 2, yBox1 + 20); //la scritta sta al centro

  
  fill(29, 111, 165); 
  textSize(24);
  text(acquaImmessa+ " mila m³", xBox1 + larghezzaBox / 2, yBox1 + 55);

  fill(29, 111, 165); 
  textSize(12);
  text("1 goccia corrisponde a 3 milioni di m³ di acqua immessa", xBox1+larghezzaBox/2, yBox1+95);

  //disegno gocce immessa
  let valoreGocciolina = 3000; //ogni gocciolina corrisponde a 3000metri cubi
  let numeroGocceImmessa = round(acquaImmessa / valoreGocciolina); //arrotondo il numero di gocce
  let startX1 = xBox1 + 30; //margine siistro di partenza della goccia su asse x
  let startY1 = yBox1 + 130; //margine di partenza della goccia su asse y

  for (let goccia = 0; goccia < numeroGocceImmessa; goccia++) { //parto dal numero 0 di gocce, continuo finchè non finiscono le gocce di acqua immessa e ogni volta aggiungo una goccia
    let colonna = goccia % 24;  //divido la goccia per 24 per capire in quale colonna si trova ora la goccia, s va oltre la 24 allora va a capo             
    let riga = Math.floor(goccia / 24); //divido la goccia per 24 per capire in che riga mi trovo
    let gocciaX = startX1 + (colonna * 24); //punto di parteznza della goccia+ avanzo della spaziatura ogni volta che avanza una colonna, quindi creo spazio costante tra le gocce
    let gocciaY = startY1 + (riga * 24);    

    if (gocciaY < yBox1 + altezzaBox - 30) { //disegna la goccia soltanto se sta tra i limiti del box
      fill(29, 111, 165);
      noStroke();
      ellipse(gocciaX, gocciaY, 3.5, 4.5);      
    }
  }
  pop();


//box a destra
  let xBox2 = 80 + larghezzaBox;
  let yBox2 = 90;

  push();
  fill(255);
  stroke(200);
  strokeWeight(2);
  rect(xBox2, yBox2, larghezzaBox, altezzaBox, 10);

  noStroke();
  fill(64, 64, 64);
  textSize(22);
  textFont(mioFont);
  textAlign(CENTER, TOP);
  text("Acqua Erogata", xBox2 + larghezzaBox / 2, yBox2 + 20);

  
  fill(52, 152, 219); 
  textSize(24);
  text(acquaErogata+ " mila m³", xBox2 + larghezzaBox / 2, yBox2 + 55);

  fill(52, 152, 219); 
  textSize(12);
  text("1 goccia corrisponde a 3 milioni di m³ di acqua erogata", xBox2+larghezzaBox/2, yBox2+95);

  //disegno gocce erogata
  let numeroGocceErogata = round(acquaErogata / valoreGocciolina);
  let startX2 = xBox2 + 30;
  let startY2 = yBox2 + 130;

  for (let goccia = 0; goccia < numeroGocceErogata; goccia++) {
    let colonna = goccia % 24;                  
    let riga = Math.floor(goccia / 24);
    let gocciaX = startX2 + (colonna * 24); 
    let gocciaY = startY2 + (riga * 24);    

    if (gocciaY < yBox2 + altezzaBox - 30) {
      fill(52, 152, 219);
      noStroke();
      ellipse(gocciaX, gocciaY, 3.5, 4.5);      
    }
  }
  pop();
}