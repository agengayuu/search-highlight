const contentEle        = document.getElementById("content");
const searchInput       = document.getElementById("searchInput");
const foundEle          = document.getElementById("found");
const searchBtn         = document.getElementById("searchBtn");
const positionEle       = document.getElementById('position');
const totalEle          = document.getElementById('total');
const highlightsEle     = document.getElementsByClassName('highlight');
const originalString    = contentEle.innerHTML //original content

function highlight(element, originalString, search){
    if(search.length > 0) {
        let regex       = new RegExp(search, "gi");
        let newString   = originalString.replace(regex, "<span class='highlight'> " + search + "</span>")
        element.innerHTML   = newString 
    } else {
        // tidak mencari apapun
        element.innerHTML = originalString
    }
}

function foundWord(){
    if(highlightsEle.length > 0){
        foundEle.style.display  = 'inline';
        totalEle.innerHTML      = highlightsEle.length //jumlah kata yang ditemukan
        indicator(1)    // default set indicator
    } else {
        foundEle.style.display = 'none';
    }
}

function indicator(currentPosition){
    if(currentPosition > highlightsEle.length || currentPosition == 0){
        return false; //kalau di akhir atau di awal pencarian tidak bisa next atau prev lain
    }

    removeCurrentIndicator()

    highlightsEle[currentPosition - 1].id = currentPosition
    highlightsEle[currentPosition - 1].classList.add('active');
    positionEle.innerHTML   = currentPosition
    window.location.hash    = '#' + currentPosition //move location
}

function prev(){
    indicator(parseInt(positionEle.innerText) - 1) 
}

function next(){
    indicator(parseInt(positionEle.innerText) + 1)  
}

function removeCurrentIndicator(currentPosition){
  if(highlightsEle[parseInt(positionEle.innerText) - 1]){
    highlightsEle[parseInt(positionEle.innerText) - 1].classList.remove('active');
  }
}

searchBtn.addEventListener("click", function(){
    highlight(content, originalString, searchInput.value)
    foundWord() //hitung jumlah kata yang di temukan
});