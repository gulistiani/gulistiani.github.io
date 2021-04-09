var playpause = false
document.getElementById("container").style.display = "none"
document.getElementById("container_star").style.display = "none"
document.getElementById("resetBtn").style.visibility = "hidden"
document.getElementById("berhasilBtn").style.visibility = "hidden"
document.getElementById("gagalBtn").style.visibility = "hidden"
var detailSurat = []
var pilihanStart = 1
var pilihanEnd = 1
var randomNumber = 1
var randomAyat = 1
var randomOK = []
var berhasilBtn = 0
var status = []
var counter = 0
var jmlTest = 0
let arrStar = []
let insertStarYes = `<img class="star" src="img/yes.png">`
let insertStarNo = `<img class="star" src="img/no.png">`
let insertStarNetral = `<img class="star" src="img/netral.png">`
let jmlGagal = 0
let jmlBerhasil = 0
let jmlNetral = 0

function togglePlay() {
    arrStar = []
    counter = 0
    jmlGagal = 0
    jmlBerhasil = 0
    document.getElementById("surat").disabled = true
    document.getElementById("start").disabled = true
    document.getElementById("end").disabled = true
    document.getElementById("jmlTest").disabled = true
    document.getElementById("denganAudio").disabled = true
    document.getElementById("tanpaAudio").disabled = true
    document.getElementById("myButton").disabled = true
    document.getElementById('ayatJawaban').innerHTML = ''
    document.getElementById('ayatSoal').innerHTML = ''

    pilihanStart = Number(document.getElementById("start").value)
    pilihanEnd = Number(document.getElementById("end").value)
    jmlTest = Number(document.getElementById("jmlTest").value)

    let pilihanSurat = getSurat()
    detailSurat = getDetailSurat(pilihanSurat)

    if (pilihanStart < 1) {
        showError(`Nomor ayat ${pilihanStart} tidak valid`)
    } else if (pilihanEnd > detailSurat[0]) {
        showError(`Nomor ayat ${pilihanEnd} tidak valid untuk surat ${pilihanSurat}`)
    } else if (jmlTest > pilihanEnd - pilihanStart + 1) {
        showError(`Jumlah test (${jmlTest}) melebihi range ayat (dari ayat ${pilihanStart} ke ayat ${pilihanEnd} cuma ada ${pilihanEnd - pilihanStart + 1} ayat)`)
    } else {
        document.getElementById("resetBtn").style.visibility = "visible"
        randomNumber = getRndInteger(pilihanStart, pilihanEnd)
        let randomNumberUnik = randomUniqueNum(pilihanStart, pilihanEnd)
        randomOK = randomNumberUnik.slice(0, jmlTest)
        startAnimationIn(document.getElementById("container"))
        playQuestion()
    }
}

function nextQuestion() {
    startAnimationOut(document.getElementById("container"))

    if (counter < jmlTest) {
        setTimeout(function () {
            startAnimationIn(document.getElementById("container"))
        }, 1500)
    }
    playQuestion()
}

function playQuestion() {
    document.getElementById("berhasilBtn").style.visibility = "visible";
    document.getElementById("gagalBtn").style.visibility = "visible";
    document.getElementById("container").style.display = "block"
    document.getElementById("container_star").style.display = "block"
    randomAyat = Number(detailSurat[5]) + Number(randomOK[counter])

    let totalStar = ''
    for (let i = 0; i < arrStar.length; i++) {
        totalStar = totalStar + arrStar[i]
    }
    for (let i = 0; i < jmlTest - arrStar.length; i++) {
        totalStar = totalStar + insertStarNetral
    }
    document.getElementById("container_star").innerHTML = totalStar

    if (counter < jmlTest) {
        let fileAudio = `data/mp3/${detailSurat[1].toString().padStart(3, '0')}${randomOK[counter].toString().padStart(3, '0')}.mp3`
        document.getElementById('ayatSoal').innerText = `Soal ke-${counter + 1} dari ${jmlTest} soal`
        document.getElementById("soal").innerText = data[randomAyat - 1].pendek

        document.getElementById('ayatJawaban').innerText = `Kunci jawaban: Surat ${detailSurat[2]} ayat ${randomOK[counter]}`
        document.getElementById("jawaban").innerText = data[randomAyat - 1].panjang

        if (document.getElementById("denganAudio").checked === true) {
            let audio = document.getElementById("myAudio")
            audio.src = fileAudio

            if (playpause === false) {
                document.getElementById("berhasilBtn").disabled = true
                document.getElementById("gagalBtn").disabled = true

                setTimeout(function () {
                    setTimeout(function () {
                        audio.play()
                    }, 1000)

                    document.getElementById("berhasilBtn").disabled = true
                    document.getElementById("gagalBtn").disabled = true

                    setTimeout(function () {
                        audio.pause()
                        audio.currentTime = 0
                        document.getElementById("berhasilBtn").disabled = false
                        document.getElementById("gagalBtn").disabled = false
                    }, 4500)
                }, 1000)

            }
            else {
                document.getElementById("berhasilBtn").disabled = false
                document.getElementById("gagalBtn").disabled = false
                audio.pause()
            }

        } else {
            if (playpause === false) {
                document.getElementById("berhasilBtn").disabled = true
                document.getElementById("gagalBtn").disabled = true
                setTimeout(function () {
                    document.getElementById("berhasilBtn").disabled = true
                    document.getElementById("gagalBtn").disabled = true
                    setTimeout(function () {
                        document.getElementById("berhasilBtn").disabled = false
                        document.getElementById("gagalBtn").disabled = false
                    }, 100)
                }, 0)

            }
            else {
                document.getElementById("berhasilBtn").disabled = false
                document.getElementById("gagalBtn").disabled = false
            }
        }

        counter++
        if (counter >= jmlTest) {
            document.getElementById("resetBtn").style.visibility = "hidden"
            document.getElementById("myButton").style.visibility = "visible"
            document.getElementById("surat").disabled = false
            document.getElementById("start").disabled = false
            document.getElementById("end").disabled = false
            document.getElementById("jmlTest").disabled = false
            document.getElementById("denganAudio").disabled = false
            document.getElementById("tanpaAudio").disabled = false
            //document.getElementById("myButton").disabled = false

        }

    } else {
        document.getElementById("berhasilBtn").style.visibility = "hidden"
        document.getElementById("gagalBtn").style.visibility = "hidden"
        document.getElementById("myButton").disabled = false
        setTimeout(function () {
            showModal()
        }, 1000)
    }
}

function startAnimationIn(element) {
    document.getElementById("container").style.visibility = "visible"
    element.classList.add("rollIn");
    element.classList.add("roll-in");
    element.addEventListener("animationend", function () {
        element.classList.remove("rollIn");
        document.getElementById("container").style.visibility = "visible"
    });
}

function startAnimationOut(element) {
    element.classList.add("rollOut");
    element.classList.add("roll-out");
    element.addEventListener("animationend", function () {
        element.classList.remove("rollOut");
        document.getElementById("container").style.visibility = "hidden"
    });
}

function gagal() {
    arrStar.push(insertStarNo)
    jmlGagal++
    nextQuestion()
}

function berhasil() {
    arrStar.push(insertStarYes)
    jmlBerhasil++
    nextQuestion()
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
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
    document.getElementById("gagalBtn").style.visibility = "hidden"
    document.getElementById("berhasilBtn").style.visibility = "hidden"
    document.getElementById("resetBtn").style.visibility = "hidden"
    document.getElementById("myButton").style.visibility = "visible"
    document.getElementById("berhasilBtn").style.visibility = "hidden"
    document.getElementById("berhasilBtn").style.visibility = "hidden"
    document.getElementById("surat").disabled = false
    document.getElementById("start").disabled = false
    document.getElementById("end").disabled = false
    document.getElementById("jmlTest").disabled = false
    document.getElementById("denganAudio").disabled = false
    document.getElementById("tanpaAudio").disabled = false
    document.getElementById("myButton").disabled = false
    document.getElementById('ayatSoal').innerHTML = ''
    document.getElementById('ayatSoal').innerText = ''
    document.getElementById("soal").innerText = ''
    document.getElementById('ayatJawaban').innerText = ''
    document.getElementById("jawaban").innerText = ''
    document.getElementById("container").style.display = "none"
    document.getElementById("container_star").style.display = "none"
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

//////////////////////////////////////////////////////////////////////////////////////////////////
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function showError(errMsg) {
    document.getElementById('pesan').innerHTML = 'Invalid Data'
    document.getElementById('nilai').innerText = errMsg
    document.getElementById('footer').innerText = 'Coba dicek lagi ...'
    modal.style.display = "block";

    document.getElementById("surat").disabled = false
    document.getElementById("start").disabled = false
    document.getElementById("end").disabled = false
    document.getElementById("jmlTest").disabled = false
    document.getElementById("denganAudio").disabled = false
    document.getElementById("tanpaAudio").disabled = false
    document.getElementById("myButton").disabled = false
}

function showModal() {
    let score = Math.round(jmlBerhasil / jmlTest * 100)
    if (score >= 80) {
        document.getElementById('pesan').innerHTML = '&#127881; Subhanallah, kamu hebat! &#128077;'
    } else if (score >= 60 && score < 80) {
        document.getElementById('pesan').innerHTML = 'Ayo sedikit lagi... &#127803;'
    } else {
        document.getElementById('pesan').innerHTML = 'Jangan sedih, kamu pasti bisa! &#128521;'
    }

    document.getElementById('nilai').innerText = `Nilai kamu ${score}`
    document.getElementById('footer').innerText = `Semangat terus ya anak sholeh/sholehah ...`
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}