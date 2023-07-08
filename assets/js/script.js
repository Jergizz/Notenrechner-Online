const noten = [];
const gewichtungen = [];

const noteInput = document.getElementById("note");
const gewichtungSelect = document.getElementById("gewichtung");
let initialNoteValue = noteInput.value;
let initialGewichtungValue = gewichtungSelect.value;

function berechneDurchschnitt() {
  const note = parseFloat(noteInput.value);
  const gewichtung = gewichtungSelect.value;

  if (note >= 1 && note <= 6) {
    noten.push(note);
    gewichtungen.push(gewichtung);
    updateNotenListe();
    berechneUndAktualisiereDurchschnitt();
  }

  noteInput.value = initialNoteValue;
  gewichtungSelect.value = initialGewichtungValue;
}

noteInput.addEventListener("input", function() {
  initialNoteValue = noteInput.value;
});

gewichtungSelect.addEventListener("change", function() {
  initialGewichtungValue = gewichtungSelect.value;
});

function updateNotenListe() {
  const notenListe = document.getElementById("notenListe");
  notenListe.innerHTML = "";

  for (let i = 0; i < noten.length; i++) {
    const noteEintrag = document.createElement("li");
    const gewichtungText = {
      "A": "2",
      "B": "1",
      "C": "0.5",
    }[gewichtungen[i]];

    noteEintrag.textContent = "Note: " + noten[i] + ", Gewichtung: " + gewichtungText;

    const entfernenButton = document.createElement("button");
    entfernenButton.textContent = "X";
    entfernenButton.className = "entfernenButton";
    entfernenButton.setAttribute("data-index", i);
    entfernenButton.onclick = entferneNote;

    noteEintrag.appendChild(entfernenButton);
    notenListe.appendChild(noteEintrag);
  }
}

function entferneNote(event) {
  const index = event.target.getAttribute("data-index");
  noten.splice(index, 1);
  gewichtungen.splice(index, 1);
  updateNotenListe();
  berechneUndAktualisiereDurchschnitt();
}

function berechneUndAktualisiereDurchschnitt() {
  const gewicht = { "A": 2, "B": 1, "C": 0.5 };
  const gewichteteNoten = noten.map((note, i) => note * gewicht[gewichtungen[i]]);
  const summe = gewichteteNoten.reduce((a, b) => a + b, 0);
  const gewichtungSumme = gewichtungen.map(g => gewicht[g]).reduce((a, b) => a + b, 0);

  const durchschnitt = gewichtungSumme !== 0 ? summe / gewichtungSumme : 0;
  const durchschnittElement = document.getElementById("durchschnitt");
  durchschnittElement.textContent = "Der gewichtete Durchschnitt der Noten ist: " + durchschnitt.toFixed(3);
}

function alleNotenLoeschen() {
  noten.length = 0;
  gewichtungen.length = 0;
  updateNotenListe();
  berechneUndAktualisiereDurchschnitt();
}

document.getElementById("notenForm").addEventListener("submit", berechneDurchschnitt);
document.getElementById("alleLoeschenButton").addEventListener("click", alleNotenLoeschen);

document.getElementById("shareButton").addEventListener("click", function () {
  if (navigator.share) {
    navigator.share({
      title: "Notenrechner Online",
      url: window.location.href,
    })
      .then(() => console.log("Erfolgreich geteilt"))
      .catch((error) => console.log("Fehler beim Teilen:", error));
  } else {
    alert("Die Teilen-Funktion wird von Ihrem Browser nicht unterstützt.");
  }
});