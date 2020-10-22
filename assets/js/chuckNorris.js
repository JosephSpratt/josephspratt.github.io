document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e){
    const num = document.getElementById('number').value;

    xhr = new XMLHttpRequest();
    xhr.open('GET', `http://api.icndb.com/jokes/random/${num}`, true);
    xhr.onload = function(){
        if(xhr.status === 200){
            const response = JSON.parse(this.responseText);
            console.log(response);

            let output = "";
            if(response.type === 'success'){
                response.value.forEach(joke => {
                    output += `<li>${joke.joke}</li>`
                });
            }else{
                output += "<li> Something went wrong </li>";
            }
            document.querySelector('.jokes').innerHTML = output;
        }
    }
    xhr.send();
    console.log(num);
    console.log("getJokes");
    e.preventDefault();
}