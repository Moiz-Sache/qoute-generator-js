const getQouteBtn = document.querySelector(".get-qoutes");

getQouteBtn.addEventListener("click", getQoute);

const numberOfQoutes = document.getElementById("number");

function getQoute(e) {
    e.preventDefault();

    if (numberOfQoutes.value.length == 0) {
        return alert("Please enter number");
    } else {

        fetch("https://type.fit/api/quotes")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                // console.log(JSON.stringify(data));
                data = shuffleQoutes(data);
                let output = "";
                for(let i=0; i< data.length; i++){
                    if(i== numberOfQoutes.value){break};
                    output += `
                    <li>Qoute : ${data[i].text}</li>
                    <li>Auther : ${data[i].author}</li>
                    <hr>`
                }

                document.querySelector(".qoutes").innerHTML = output;
            })
    }
}

function shuffleQoutes(qoutes){
    let CI = qoutes.length, tempValue, randomIndex;

    while(CI > 0){
        randomIndex = Math.floor(Math.random() * CI);
        CI--;

        tempValue = qoutes[CI];
        qoutes[CI] = qoutes[randomIndex];
        qoutes[randomIndex] = tempValue;
    }

    return qoutes;
}