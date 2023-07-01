        var noten = [];

        var gewichtungen = [];

  

        var noteInput = document.getElementById("note");
        var gewichtungSelect = document.getElementById("gewichtung");
        var initialNoteValue = noteInput.value;
        var initialGewichtungValue = gewichtungSelect.value;
        
        function berechneDurchschnitt() {
          var note = parseFloat(noteInput.value);
          var gewichtung = gewichtungSelect.value;
        
          if (note >= 1 && note <= 6) {
            noten.push(note);
            gewichtungen.push(gewichtung);
            updateNotenListe();
            berechneUndAktualisiereDurchschnitt();
          } else {
            alert("Die Note muss zwischen 1 und 6 liegen.");
          }
        
          noteInput.value = initialNoteValue;
          gewichtungSelect.value = initialGewichtungValue;
        
          noteInput.focus();
        }
        
        noteInput.addEventListener("input", function() {
          initialNoteValue = noteInput.value;
        });
        
        gewichtungSelect.addEventListener("change", function() {
          initialGewichtungValue = gewichtungSelect.value;
        });
        
        
        

  

        function updateNotenListe() {

          var notenListe = document.getElementById("notenListe");

          notenListe.innerHTML = "";

  

          for (var i = 0; i < noten.length; i++) {

            var noteEintrag = document.createElement("li");

            var gewichtungText = "";

  

            switch (gewichtungen[i]) {

              case "A":

                gewichtungText = "2";

                break;

              case "B":

                gewichtungText = "1";

                break;

              case "C":

                gewichtungText = "0.5";

                break;

            }

  

            noteEintrag.textContent = "Note: " + noten[i] + ", Gewichtung: " + gewichtungText;

  

            var entfernenButton = document.createElement("button");

            entfernenButton.textContent = "X";

            entfernenButton.className = "entfernenButton"; // Hinzufügen der Klasse

            entfernenButton.setAttribute("data-index", i);

            entfernenButton.onclick = entferneNote;

  

            noteEintrag.appendChild(entfernenButton);

            notenListe.appendChild(noteEintrag);

          }

        }

  

        function entferneNote(event) {

          var index = event.target.getAttribute("data-index");

          noten.splice(index, 1);

          gewichtungen.splice(index, 1);

          updateNotenListe();

          berechneUndAktualisiereDurchschnitt();

        }

  

        function berechneUndAktualisiereDurchschnitt() {
            var summe = 0;
            var gewichtungSumme = 0;
          
            for (var i = 0; i < noten.length; i++) {
              var note = noten[i];
              var gewichtung = gewichtungen[i];
          
              var gewicht = { "A": 2, "B": 1, "C": 0.5 };
              var gewichtungWert = gewicht[gewichtung];
          
              summe += note * gewichtungWert;
              gewichtungSumme += gewichtungWert;
            }
          
            var durchschnitt = gewichtungSumme !== 0 ? summe / gewichtungSumme : 0;
            var durchschnittElement = document.getElementById("durchschnitt");
            durchschnittElement.textContent = "Der gewichtete Durchschnitt der Noten ist: " + durchschnitt.toFixed(3);
          }
          

        function alleNotenLoeschen() {
            noten = [];
            gewichtungen = [];
            updateNotenListe();
            berechneUndAktualisiereDurchschnitt();
          }
          