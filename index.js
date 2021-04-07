var playpause = false
document.getElementById("jawaban").style.display = "none"
document.getElementById("card").style.display = "none"
document.getElementById("jawabanBtn").style.visibility = "hidden"
document.getElementById("questionBtn").style.visibility = "hidden";
document.getElementById("resetBtn").style.visibility = "hidden";
var detailSurat = []
var pilihanStart = 1
var pilihanEnd = 1
var randomNumber = 1
var randomAyat = 1
var randomOK = []
var berhasil = 0
var status = []
var counter = 0
var jmlTest = 0

function togglePlay() {
    counter = 0
    document.getElementById("jawaban").style.display = "none"
    document.getElementById("surat").disabled = true
    document.getElementById("start").disabled = true
    document.getElementById("end").disabled = true
    document.getElementById("jmlTest").disabled = true
    document.getElementById("denganAudio").disabled = true
    document.getElementById("tanpaAudio").disabled = true
    document.getElementById("myButton").disabled = true
    document.getElementById("jawabanBtn").style.visibility = "hidden"
    document.getElementById('ayatJawaban').innerHTML = ''
    document.getElementById('demo').innerHTML = ''

    pilihanStart = Number(document.getElementById("start").value)
    pilihanEnd = Number(document.getElementById("end").value)
    jmlTest = Number(document.getElementById("jmlTest").value)

    let pilihanSurat = getSurat()
    detailSurat = getDetailSurat(pilihanSurat)

    if (pilihanStart < 1) {
        alert(`Nomor ayat ${start} tidak valid`)
    } else if (pilihanEnd > detailSurat[0]) {
        alert(`Nomor ayat ${end} tidak valid untuk surat ${pilihanSurat}`)
    } else {
        document.getElementById("questionBtn").style.visibility = "visible"
        document.getElementById("resetBtn").style.visibility = "visible"

        randomNumber = getRndInteger(pilihanStart, pilihanEnd)
        let randomNumberUnik = randomUniqueNum(pilihanStart, pilihanEnd)
        randomOK = randomNumberUnik.slice(0, jmlTest)

    }
}

function playQuestion() {
    startanimation(document.getElementById("card"))
    document.getElementById("card").style.display = "block"
    document.getElementById('ayatJawaban').innerHTML = ''
    document.getElementById("jawaban").style.display = "none"
    document.getElementById("jawabanBtn").style.visibility = "visible"
    randomAyat = Number(detailSurat[5]) + Number(randomOK[counter])

    let fileAudio = `quran/${detailSurat[1].toString().padStart(3, '0')}${randomOK[counter].toString().padStart(3, '0')}.mp3`
    document.getElementById('demo').innerHTML = `Soal ke ${counter + 1} dari ${jmlTest}`
    document.getElementById("card").innerText = data[randomAyat - 1].pendek

    if (document.getElementById("denganAudio").checked === true) {
        let audio = document.getElementById("myAudio")
        audio.src = fileAudio

        if (playpause === false) {
            document.getElementById("questionBtn").disabled = true

            setTimeout(function () {
                audio.play()
                document.getElementById("questionBtn").disabled = true

                setTimeout(function () {
                    audio.pause()
                    audio.currentTime = 0
                    document.getElementById("questionBtn").disabled = false
                }, 4000)
            }, 1000)

        }
        else {
            document.getElementById("questionBtn").disabled = false
            audio.pause()
        }

    } else {
        if (playpause === false) {
            document.getElementById("questionBtn").disabled = true
            setTimeout(function () {
                document.getElementById("questionBtn").disabled = true
                setTimeout(function () {
                    document.getElementById("questionBtn").disabled = false
                }, 100)
            }, 0)

        }
        else {
            document.getElementById("questionBtn").disabled = false
        }
    }

    counter++
    console.log(counter)
    if (counter >= Number(document.getElementById("jmlTest").value)) {
        document.getElementById("questionBtn").style.visibility = "hidden"
        document.getElementById("resetBtn").style.visibility = "hidden"
        document.getElementById("myButton").style.visibility = "visible"
        document.getElementById("surat").disabled = false
        document.getElementById("start").disabled = false
        document.getElementById("end").disabled = false
        document.getElementById("jmlTest").disabled = false
        document.getElementById("denganAudio").disabled = false
        document.getElementById("tanpaAudio").disabled = false
        document.getElementById("myButton").disabled = false

    }
}

function startanimation(element) {
    element.classList.add("bounce");
    element.addEventListener("animationend", function () {
        element.classList.remove("bounce");
    });

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function showJawaban() {
    document.getElementById("jawaban").style.display = "block"
    document.getElementById("jawaban").innerText = data[randomAyat - 1].panjang
    document.getElementById('ayatJawaban').innerHTML = `Surat ${detailSurat[2]} ayat ${randomOK[counter - 1]}`
}

function randomUniqueNum(start, end) {
    let arr = []
    for (i = start; i <= end; i++) {
        arr.push(i)
    }

    return shuffle(arr)
}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}


function resetQuestion() {
    document.getElementById("questionBtn").style.visibility = "hidden"
    document.getElementById("resetBtn").style.visibility = "hidden"
    document.getElementById("jawabanBtn").style.visibility = "hidden"
    document.getElementById("myButton").style.visibility = "visible"
    document.getElementById("surat").disabled = false
    document.getElementById("start").disabled = false
    document.getElementById("end").disabled = false
    document.getElementById("jmlTest").disabled = false
    document.getElementById("denganAudio").disabled = false
    document.getElementById("tanpaAudio").disabled = false
    document.getElementById("myButton").disabled = false
    document.getElementById('demo').innerHTML = ''
    document.getElementById("jawaban").style.display = "none"
    document.getElementById("ayatJawaban").innerText = ''
    document.getElementById("card").style.display = "none"
    document.getElementById("jawaban").style.display = "none"


}

function getSurat() {
    let temp = document.getElementById("surat")
    let pilihanSurat = temp.options[temp.selectedIndex].text;
    return pilihanSurat
}

function getDetailSurat(surat) {
    let jmlAyat = 1
    for (let i = 0; i < daftar_surat.length; i++) {
        if (daftar_surat[i].nama_surat === surat) {
            jmlAyat = daftar_surat[i].ayat
            no_surat = daftar_surat[i].no_surat
            nama_surat = daftar_surat[i].nama_surat
            arti_surat = daftar_surat[i].arti_surat
            jenis = daftar_surat[i].jenis
            startAyat = daftar_surat[i].startAyat
            endAyat = daftar_surat[i].endAyat
            break
        }
    }
    return [Number(jmlAyat), no_surat, nama_surat, arti_surat, jenis, startAyat, endAyat]
}