var tableTitleYear = document.querySelector("#tableTitleYear")
tableTitleYear.innerHTML = new Date().getFullYear()

var addParticipantButton = document.querySelector("#addParticipantsButton")
var tbodyContent = document.querySelector("tbody")

addParticipantButton.addEventListener("click", addUserToTable)

function addUserToTable() {
    var participant = document.querySelector("#participant").nodeValue
    var contact = document.querySelector("#contact").nodeValue
    
    var participantCell = document.createElement('td')
    participantCell.textContent = participant
    var contactCell = document.createElement('td')
    contactCell.textContent = contact
    var removeParticipantCell = document.createElement('td')
    removeParticipantCell.textContent = "trash can icon for deleting row"

    var tableData = document.createElement('tr')
    tableData.appendChild(participantCell)
    tableData.appendChild(contactCell)

    tbodyContent.appendChild(tableData)
}