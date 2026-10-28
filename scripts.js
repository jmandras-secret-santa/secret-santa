/**
 * Generates Secret Santa pairings based on constraints.
 * @param {Array} participants - Array of all current participants: ['Jason', 'JC', 'Jack', etc.]
 * @param {Object} history - Key: giver, Value: last year's recipient. ex: {'Jason': 'Shuan'}
 * @param {Array} pairings [{giver: 'Name', recipient: 'Name'}]
 */

function generateSecretSanta(participants, history = {}) {
    let recipients = [...participants];
    let attempts = 0;
    const maxAttempts = 1000; //safe limit to prevent infinite loops

    while(attempts < maxAttempts) {
        attempts++;

        //1. Shuffle recipients using Fisher-Yates algorithm
        for(let i = recipients.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [recipients[i], recipients[j]] = [recipients[j], recipients[i]];
        }

        let isValid = true;

        //2. Validate pairings against rules
        for(let i = 0; i < participants.length; i++) {
            const giver = participants[i];
            const recipient = recipients[i];
            const previousRecipient = history[giver];

            //Rule 1: Cannot buy for yourself
            if(giver === recipient) {
                isValid = false;
                break;
            }

            //Rule 2: Cannot buy for previous recipient (skipped if new participant)
            if(previousRecipient !== undefined && recipient === previousRecipient) {
                isValid = false;
                break;
            }
        }

        //3. If all pairs pass, map and return them
        if(isValid) {
            return participants.map((giver, index) => ({
                giver: giver,
                recipient: recipients[index]
            }));
        }
    }

    throw new Error("Could not find a valid pairing.  The constraints might be mathematically impossible for this group size.")
}

// ------Example usage------
let currentParticipants = document.querySelector("#currentParticipants").value;
let previousPairings = document.querySelector("#previousPairings").value;
let pairButton = document.querySelector("pairParticipantsButton")
pairButton.addEventListener("click", () => {
    try {
        const finalPairs = generateSecretSanta(currentParticipants, previousPairings);
        console.table(finalPairs);
    } catch(error) {
        console.error(error.message);
    }
})