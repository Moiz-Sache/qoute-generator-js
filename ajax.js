
const getQouteBtn = document.querySelector(".get-qoutes");

getQouteBtn.addEventListener("click", getQoute);

const numberOfQoutes = document.getElementById("number");

function getQoute(e) {
    e.preventDefault();

    if (numberOfQoutes.value.length == 0) {
        return alert("Please enter number");
    } else {
        const xmlHttpReq = new XMLHttpRequest();

        xmlHttpReq.open("GET", "https://type.fit/api/quotes", true);

        xmlHttpReq.onload = function () {
            if (this.status === 200) {
                // console.log(this.responseText);

                const response = shuffleQoutes(JSON.parse(this.responseText));
                let output = "";
                // response.forEach(element => {
                    // output += `
                    // <li>Qoute : ${element.text}</li>
                    // <li>Auther : ${element.author}</li>
                    // <hr>
                // `
                // });

                for(let i=0; i< response.length; i++){
                    if(i== numberOfQoutes.value){break};
                    output += `
                    <li>Qoute : ${response[i].text}</li>
                    <li>Auther : ${response[i].author}</li>
                    <hr>`
                }

                document.querySelector(".qoutes").innerHTML = output;
            }
        };

        xmlHttpReq.send();
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