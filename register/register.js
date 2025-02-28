// register.js
import { successTemplate, participantTemplate } from "./templates.js";

let currentParticipantCount = 1;

function renderNewParticipant () {
    currentParticipantCount++;
    const newParticipantSection = participantTemplate(currentParticipantCount);
    document.getElementById("add").insertAdjacentHTML('beforebegin', newParticipantSection);
}

function submitForm(event) {
    event.preventDefault();

    const info = {
        name: event.target.adult_name.value,
        participants: document.querySelectorAll("[class^='participant']").length - 1,
        fee: totalFees(),
    }

    event.target.style.display = "none";
    
    document.getElementById('summary').innerHTML = successTemplate(info);
}

function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements];

    let total = 0;
    feeElements.forEach(element => {
        total += parseFloat(element.value); 
    });

    return total;
}

document.getElementById("add").addEventListener("click", renderNewParticipant);
document.querySelector("form").addEventListener("submit", submitForm);