let opgaver = [];

window.onload = function() {
  hentOpgaver();
  visOpgaver();
  registrerServiceWorker();
};

function tilfoejOpgave() {
  const input = document.getElementById("opgaveInput");
  const tekst = input.value.trim();

  if (tekst === "") {
    alert("Skriv en opgave først");
    return;
  }

  const nyOpgave = {
    tekst: tekst,
    faerdig: false
  };

  opgaver.push(nyOpgave);

  input.value = "";

  gemOpgaver();
  visOpgaver();
}

function visOpgaver() {
  const liste = document.getElementById("opgaveListe");
  liste.innerHTML = "";

  for (let i = 0; i < opgaver.length; i++) {
    const punkt = document.createElement("li");

    const opgaveTekst = document.createElement("span");
    opgaveTekst.textContent = opgaver[i].tekst;

    if (opgaver[i].faerdig) {
      opgaveTekst.classList.add("faerdig");
    }

    opgaveTekst.onclick = function() {
      opgaver[i].faerdig = !opgaver[i].faerdig;
      gemOpgaver();
      visOpgaver();
    };

    const sletKnap = document.createElement("button");
    sletKnap.textContent = "Slet";

    sletKnap.onclick = function() {
      opgaver.splice(i, 1);
      gemOpgaver();
      visOpgaver();
    };

    punkt.appendChild(opgaveTekst);
    punkt.appendChild(sletKnap);

    liste.appendChild(punkt);
  }
}

function gemOpgaver() {
  localStorage.setItem("mineOpgaver", JSON.stringify(opgaver));
}

function hentOpgaver() {
  const gemteOpgaver = localStorage.getItem("mineOpgaver");

  if (gemteOpgaver !== null) {
    opgaver = JSON.parse(gemteOpgaver);
  }
}

function registrerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
}