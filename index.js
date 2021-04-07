var playpause = false
document.getElementById("jawaban").style.display = "none"
var randomAyat = 1
var randomOK = []
var berhasil = 0
var status = []

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

function togglePlay() {
    document.getElementById("jawaban").style.display = "none"
    let button = document.getElementById("myButton")

    let pilihanStart = Number(document.getElementById("start").value)
    let pilihanEnd = Number(document.getElementById("end").value)
    let jmlTest = Number(document.getElementById("jmlTest").value)

    let pilihanSurat = getSurat()
    let detailSurat = getDetailSurat(pilihanSurat)

    if (pilihanStart < 1) {
        alert(`Nomor ayat ${start} tidak valid`);
    } else if (pilihanEnd > detailSurat[0]) {
        alert(`Nomor ayat ${end} tidak valid untuk surat ${pilihanSurat}`);
    } else {
        let randomNumber = getRndInteger(pilihanStart, pilihanEnd)
        let randomNumberUnik = randomUniqueNum(pilihanStart, pilihanEnd)

        randomOK = randomNumberUnik.slice(0, jmlTest);

        //console.log(randomOK)

        //let status = []
        // let satuanTest = {}
        // for (i = 0; i < randomOK.length; i++) {
        //     satuanTest = {}
        //     satuanTest.no = i + 1
        //     satuanTest.ayat = randomOK[i]
        //     satuanTest.status = 'belum'

        //     status.push(satuanTest)
        // }
        // console.log(status)


        randomAyat = detailSurat[5] + randomNumber

        let fileAudio = `quran/${detailSurat[1].toString().padStart(3, '0')}${randomNumber.toString().padStart(3, '0')}.mp3`

        document.getElementById('demo').innerHTML = `Surat ${pilihanSurat} ayat ${randomNumber} test ${randomOK}`
        document.getElementById("card").innerText = data[randomAyat - 1].pendek

        if (document.getElementById("denganAudio").checked === true) {
            let audio = document.getElementById("myAudio")
            audio.src = fileAudio

            if (playpause === false) {
                button.disabled = true

                setTimeout(function () {
                    audio.play()
                    button.disabled = true

                    setTimeout(function () {
                        audio.pause()
                        audio.currentTime = 0
                        button.disabled = false
                    }, 4000)
                }, 1000)

            }
            else {
                button.disabled = false
                audio.pause()
            }

        } else {
            if (playpause === false) {
                button.disabled = true
                setTimeout(function () {
                    button.disabled = true
                    setTimeout(function () {
                        button.disabled = false
                    }, 100)
                }, 0)

            }
            else {
                button.disabled = false
            }
        }
    }
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function showJawaban() {
    document.getElementById("jawaban").style.display = "block"
    document.getElementById("jawaban").innerText = data[randomAyat - 1].panjang
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

