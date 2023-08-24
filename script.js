const genel = document.querySelector(".genel"),
inputPart = genel.querySelector(".giris-kismi"),
infoTxt = inputPart.querySelector(".bilgi"),
inputField = inputPart.querySelector("input"),
lokasyonBtn = inputPart.querySelector("button")
wIcon = document.querySelector(".hava-durumu img")
arrowBack = document.querySelector("header i")
let api;

function havaDurumuAyrintilar(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error")
        infoTxt.innerText = `${inputField.value} şehri bulunamadı...`
    }else{
        const city = info.name
        const country = info.sys.country
        const {description, id} = info.weather[0]
        const {feels_like, humidity, temp} = info.main

        if(id==800){
            wIcon.src = "icons/clear.svg"
        }else if(id => 200 && id <= 232){
            wIcon.src = "icons/storm.svg"
        }else if(id => 600 && id <= 622){
            wIcon.src = "icons/snow.svg"
        }else if(id => 701 && id <= 781){
            wIcon.src = "icons/haze.svg"
        }else if(id => 801 && id <= 804){
            wIcon.src = "icons/cloud.svg"
        }else if(id => 300 && id <= 321 || (id => 500 && id <= 531)){
            wIcon.src = "icons/rain.svg"
        }

        console.log(info)
        genel.querySelector(".sicaklik .numb").innerText = Math.floor(temp)
        genel.querySelector(".hava").innerText = description
        genel.querySelector(".lokasyon").innerText = `${city}, ${country}`
        genel.querySelector(".sicaklik .numb-2").innerText = Math.floor(feels_like)
        genel.querySelector(".nem span").innerText = `%${humidity}`
        infoTxt.classList.remove("pending", "error")
        genel.classList.add("active")
    }
}

inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != ""){
        istekApi(inputField.value)
    }
})

function istekApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a16e33bdb752c9b5778d38c42614a6e4&lang=tr`;
    veriGetir()
}


function veriGetir(){
    infoTxt.innerText = "Sonuçlar getiriliyor..."
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => havaDurumuAyrintilar(result))
}



//buraya kadar rapora yazıldı.

lokasyonBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(basarili, basarisiz)
    }else{
        console.log("Tarayıcınız geolocation'ı desteklemiyor...")
    }
})


function basarili(konum){
    const {latitude, longitude} = konum.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a16e33bdb752c9b5778d38c42614a6e4&lang=tr`;
    veriGetir()
}


function basarisiz(hata){
    infoTxt.innerText = hata.message   
    infoTxt.classList.add("error")
}

arrowBack.addEventListener("click", () => {
    genel.classList.remove("active")
})


