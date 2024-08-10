
const dropdown = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector(".btn");
for(let select of dropdown) {
    for (code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code==="USD"){
            newOption.selected = "selected";
        }else if(select.name==="to" && code==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);//target is the present element that you have selected from the option.
    });
}


const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");//since we are at the select the img is in the container of in which both image and select exits so be clear at this point
    img.src = newSrc;//this is how to do it for to select the image source to updata the image of the given element
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const response = await fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_5loqnfvFkpavpfi7FSpUxpa1CLoAxCvlSn6Ie8kl');
    const maindata = await response.json();
    let rate2 = maindata.data[toCurr.value].value;
    let rate1 = maindata.data[fromCurr.value].value;

    let finalAmount = amtVal * (rate2/rate1);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
  
