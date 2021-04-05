var playpause = false

//console.log(data[3].pendek)

function togglePlay() {

    let start = Number(document.getElementById("start").value)
    let end = Number(document.getElementById("end").value)
    let randomNumber = getRndInteger(start, end)

    document.getElementById("card").innerText = data[3].pendek
    let button = document.getElementById("myButton")
    let audio = document.getElementById("myAudio")
    //console.log(randomNumber)
    document.getElementById('demo').innerHTML = randomNumber
    audio.src = "quran/002" + randomNumber.toString().padStart(3, '0') + ".mp3"

    playpause = !playpause
    if (playpause) {
        button.innerHTML = "Pause"
        setTimeout(function () {
            audio.play()

            setTimeout(function () {
                audio.pause()
                audio.currentTime = 0
                button.innerHTML = "Silahkan lanjutkan ayatnya ..."
            }, 8000)
        }, 100)
    }
    else {
        button.innerHTML = "Coba soal lain"
        audio.pause()
    }

}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
