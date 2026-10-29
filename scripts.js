/**
 * Generates Secret Santa pairings based on constraints.
 * @param {Array} participants - Array of all current participants: ['Jason', 'JC', 'Jack', etc.]
 * @param {Object} history - Key: giver, Value: last year's recipient. ex: {'Jason': 'Shuan'}
 * @param {Array} pairings [{giver: 'Name', recipient: 'Name'}]
 */

function generateSecretSanta(participants, previousPairs) {
    let assignments = {};
    let valid = false;
    let attempts = 0;
    const maxAttempts = 1000; //safe limit to prevent infinite loops

    while(!valid && (attempts < maxAttempts)) {
        attempts++;
        assignments = {};

        //1. Shuffle recipients using Fisher-Yates algorithm
        const recipients = [...participants];
        for(let i = recipients.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [recipients[i], recipients[j]] = [recipients[j], recipients[i]];
        }

        valid = true;

        //2. Validate pairings against rules
        for(let i = 0; i < participants.length; i++) {
            const giver = participants[i];
            const recipient = recipients[i];
            console.log(giver, recipient)

            //Rule 1: Cannot buy for yourself
            const isSelf = giver === recipient;

            //Rule 2: Cannot buy for previous recipient (skipped if new participant)
            const isPreviousMatch = previousPairs[giver] === recipient;
            console.log(isSelf, isPreviousMatch)
            if(isSelf || isPreviousMatch) {
                valid = false;
                break;
            }

            assignments[giver] = recipient;
            console.log(assignments)
        }
        console.log(valid)
    }

    //3. If all pairs pass, map and return them
    return assignments;
}

// ------Example usage------
let currentParticipants = document.querySelector("#currentParticipants").value;
let participantsArray = [];
let listOfParticipants = currentParticipants.split(",");
for(let i = 0; i < listOfParticipants.length; i++) {
    participantsArray.push(listOfParticipants[i].replace(" ", ""));
}

let previousPairings = document.querySelector("#previousPairings").value;
let previousPairingsArray = [];
let listOfPreviousPairings = previousPairings.split(",");
for(let i = 0; i < listOfPreviousPairings.length; i++) {
    previousPairingsArray.push(listOfPreviousPairings[i].replaceAll(" ", ""));
}

let pairButton = document.querySelector("#pairParticipantsButton")
pairButton.addEventListener("click", () => {
    const finalPairs = generateSecretSanta(participantsArray, previousPairingsArray);
    console.table(finalPairs);
});