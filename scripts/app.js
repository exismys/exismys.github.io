let word = document.querySelector(".changeWord");
let word_array = ["Philosopher🗿", "Writer📝", "Reader📚", "Nature lover🌱", "Thinker🙇", "Dreamer🌌"];
let index = 0;
function changeWord(){
    word.innerHTML = word_array[index];
    index++;
    if (index >= word_array.length){
        index = 0;
    }
}

let timer = setInterval(changeWord, 1000);