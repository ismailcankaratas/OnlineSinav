let sorular;
var baglanti = new XMLHttpRequest();
baglanti.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        sorular = JSON.parse(baglanti.responseText);
        soruGetir();
    }
    return sorular;
};
baglanti.open("GET", "assets/js/data.json", true);
baglanti.send();

const soruAlani = document.getElementsByClassName("soruAlani")[0];
const soru = document.getElementById("soru");
const secenekler = document.getElementsByName("secenek");

const aciklamaA = document.getElementById("aciklamaA");
const aciklamaB = document.getElementById("aciklamaB");
const aciklamaC = document.getElementById("aciklamaC");
const aciklamaD = document.getElementById("aciklamaD");

const gonderButonu = document.getElementById("gonder");

let puan = 0;
let sira = 0;

function soruGetir() {
    secimiTemizle();
    let siradakiSoru = sorular.sorular[sira];
    soru.innerHTML = siradakiSoru.soru;
    aciklamaA.innerHTML = siradakiSoru.secenekA;
    aciklamaB.innerHTML = siradakiSoru.secenekB;
    aciklamaC.innerHTML = siradakiSoru.secenekC;
    aciklamaD.innerHTML = siradakiSoru.secenekD;
    console.log(sorular.sorular[sira]);
}
function secimiTemizle() {
    secenekler.forEach(secenek => secenek.checked = false);
}
function secimiAl() {
    let secim;
    secenekler.forEach(secenek => {
        if (secenek.checked == true)
        {
            secim = secenek.id;
        }
    });
    return secim;
}

gonderButonu.addEventListener("click", () => {
    const secilen = secimiAl();
    if (secilen) {
        if (secilen === sorular.sorular[sira].cevap){
            puan++;
        }
    }
    sira++;
    if (sira < sorular.sorular.length){
        soruGetir();
    }else {
        soruAlani.innerHTML = `
        <h2>Mevcut sorular içerisinden ${puan}/${sorular.sorular.length} oranında başarı sağladınız.</h2>
        <button onclick="window.location.reload()">Yeniden Başla</button>
        `;
    }
});