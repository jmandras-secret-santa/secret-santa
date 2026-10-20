var tableTitleYear = document.querySelector("#tableTitleYear")
tableTitleYear.innerHTML = new Date().getFullYear()

var addParticipantButton = document.querySelector("#addParticipantsButton")
var tbodyContent = document.querySelector("tbody")

addParticipantButton.addEventListener("click", addUserToTable)

function addUserToTable() {
    var participant = document.querySelector("#participant").nodeValue
    var contact = document.querySelector("#contact").nodeValue
    
    var participantCell = `<td>${participant}</td>`
    var contactCell = `<td>${contact}</td>`

    var tableData = `<tr>${participantCell}${contactCell}</tr>`

    tbodyContent.appendChild(tableData)
}