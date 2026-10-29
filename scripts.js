let globalAssignments = null; // stores pairings from while loop
//initialize EmailJS with public key
emailjs.init("1baDSlm-hkUttqx5f");

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

let pairButton = document.querySelector("#pairParticipantsButton");
pairButton.addEventListener("click", () => {
    try {
        globalAssignments = generateSecretSanta(participantsArray, previousPairingsArray);
        console.table(globalAssignments);

        //enable the 'send notifications' button now that pairings have been made
        document.getElementById("#sendNotificationButton").disabled = false;
        alert("Pairings generated! Ready to notify participants.");
    } catch(error) {
        alert.error(error.message);
    }
});

let notificationButton = document.querySelector("#sendNotificationButton");
notificationButton.addEventListener("click", async () => {
    if(!globalAssignments) return;

    //map participants to their emails
    const participantEmails = document.querySelector("#participantEmails").value;
    let emailsArray = [];
    let listOfParticipantEmails = participantEmails.split(",");
    for(let i = 0; i < listOfParticipantEmails.length; i++) {
        emailsArray.push(listOfParticipantEmails[i].replaceAll(" ", ""));
    }
    console.log(emailsArray);

    alert("Sending emails... Please do not close the page.");

    for(const [giver, recipient] of Object.entries(globalAssignments)) {
        const emailTarget = emailsArray[giver];

        const templateParams = {
            email: emailTarget,
            giver: giver,
            recipient: recipient //the template will say "Hi {giver}, you are buying for {recipient}"
        };

        try {
            await emailjs.send('service_efa2thc', 'template_gmv1xlj', templateParams);
            console.log(`Notification successfully sent to ${giver}`);
        } catch (error) {
            console.error(`Failed to send email to ${giver}: `, error);
        }
    }

    alert("All Secret Santa notifications have been sent anonymously");
});

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

    //if there are pairing errors, throw an error
    if(!valid) {
        throw new Error("Could not find a valid pairing.");
    }

    //3. If all pairs pass, map and return them
    return assignments;
}