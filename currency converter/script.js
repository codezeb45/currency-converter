const baseUrl =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".drop select");
const input = document.getElementById("input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.getElementById("exchBtn");
for (select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (currCode === "USD" && select.name === "from") {
            newOption.selected = "selected";
        } else if (currCode === "PKR" && select.name === "to") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateExchangeRate = async() => {
    let amount = input.value;
    if (amount === "" || amount <= 0) {
        amount = 1;
    }
    let url = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = rate * amount;
    let msg = document.getElementById("msg");
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load", () => {
    updateExchangeRate();
});