var addParticipantButton = document.querySelector("#addParticipantsButton")
var tbodyContent = document.querySelector("tbody")

addParticipantButton.addEventListener("click", addUserToTable)

function addUserToTable() {
    var tableData = ""
    var participant = document.querySelector("#participant")
    var contact = document.querySelector("#contact")
    
    var participantCell = `<td>${participant}</td>`
    var contactCell = `<td>${contact}</td>`

    tableData = `<tr>${participantCell}${contactCell}</tr>`

    tbodyContent.appendChild(tableData)
}