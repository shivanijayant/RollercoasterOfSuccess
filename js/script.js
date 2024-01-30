// script.js


/********** DIE ROLL *******************/

function createDice(number) {
	const dotPositionMatrix = {
		1: [
			[50, 50]
		],
		2: [
			[20, 20],
			[80, 80]
		],
		3: [
			[20, 20],
			[50, 50],
			[80, 80]
		],
		4: [
			[20, 20],
			[20, 80],
			[80, 20],
			[80, 80]
		],
		5: [
			[20, 20],
			[20, 80],
			[50, 50],
			[80, 20],
			[80, 80]
		],
		6: [
			[20, 20],
			[20, 80],
			[50, 20],
			[50, 80],
			[80, 20],
			[80, 80]
		]
	};

	const dice = document.createElement("div");

	dice.classList.add("dice");

	for (const dotPosition of dotPositionMatrix[number]) {
		const dot = document.createElement("div");

		dot.classList.add("dice-dot");
		dot.style.setProperty("--top", dotPosition[0] + "%");
		dot.style.setProperty("--left", dotPosition[1] + "%");
		dice.appendChild(dot);
	}

	return dice;
}
function displayRollNumber(number) {
    const rollNumberDisplay = document.getElementById('roll-number-display'); // Make sure you have a corresponding element in your HTML
    rollNumberDisplay.textContent = 'Rolled: ' + number;
}

function randomizeDice(diceContainer, numberOfDice) {
    diceContainer.innerHTML = "";
    let rollNumbers = []; 

    for (let i = 0; i < numberOfDice; i++) {
        const random = Math.floor((Math.random() * 6) + 1);
        rollNumbers.push(random); // Store the roll number
        const dice = createDice(random);
        diceContainer.appendChild(dice);
    }

    /*
    // If you are rolling multiple dice and want to display the total:
    const totalRoll = rollNumbers.reduce((a, b) => a + b, 0);
    displayRollNumber(totalRoll); // Call to display the roll number
    */

    displayRollNumber(rollNumbers[0]);
}



const NUMBER_OF_DICE = 1;
const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");

randomizeDice(diceContainer, NUMBER_OF_DICE);

btnRollDice.addEventListener("click", () => {
	const interval = setInterval(() => {
		randomizeDice(diceContainer, NUMBER_OF_DICE);
	}, 50);

	setTimeout(() => clearInterval(interval), 1000);
});

/********** GAME DESIGN *******************/

const players = [
    { name: "Player 1", questCard: { Talent: "Musical Prodigy", Education: "Music Conservatory Degree", Experience: "Renowned Concert Pianist", Opportunity: "Solo Performance at Carnegie Hall" }, collectedCards: [] },
    { name: "Player 2", questCard: { Talent: "Culinary Artistry", Education: "Culinary Arts Degree", Experience: "Head Chef at a Michelin-Starred Restaurant", Opportunity: "Host a Cooking Show on a Popular Network" }, collectedCards: [] },
    { name: "Player 3", questCard: { Talent: "Literary Prowess", Education: "Creative Writing MFA", Experience: "Award-Winning Novelist", Opportunity: "Book Adaptation Deal with a Major Studio" }, collectedCards: [] },
    { name: "Player 4", questCard: { Talent: "Innovative Thinking", Education: "Engineering Degree from a Top University", Experience: "Lead Engineer at a Tech Startup", Opportunity: "Revolutionary Patent for a Life-Changing Technology" }, collectedCards: [] }
  ];
  
  
  const itemCards = [
    { type: "Talent", name: "Innovative Thinking" },
    { type: "Talent", name: "Musical Prodigy" },
    { type: "Talent", name: "Culinary Artistry" },
    { type: "Talent", name: "Literary Prowess" },
    // Define item cards for other talents
  
    { type: "Education", name: "Creative Writing MFA" },
    { type: "Education", name: "Engineering Degree from a Top University" },
    { type: "Education", name: "Culinary Arts Degree" },
    { type: "Education", name: "Music Conservatory Degree" },
    // Define item cards for other educations
  
    { type: "Experience", name: "Head Chef at a Michelin-Starred Restaurant" },
    { type: "Experience", name: "Award-Winning Novelist" },
    { type: "Experience", name: "Renowned Concert Pianist" },
    { type: "Experience", name: "Lead Engineer at a Tech Startup" },
    // Define item cards for other experiences
  
    { type: "Opportunity", name: "Solo Performance at Carnegie Hall" },
    { type: "Opportunity", name: "Book Adaptation Deal with a Major Studio" },
    { type: "Opportunity", name: "Revolutionary Patent for a Life-Changing Technology" },
    { type: "Opportunity", name: "Host a Cooking Show on a Popular Network" }
    // Define item cards for other opportunities
  ];
  
  const luckyEventCards = [
    { name: "Serendipitous Encounter" },
    { name: "Breakthrough Discovery" },
    { name: "Sudden Recognition" },
    { name: "Financial Windfall" }
    // Define lucky event cards for other events
  ];
  

const successToken = { obtained: false };
let currentPlayerIndex = 0;

function rollDie() {
    const player = players[currentPlayerIndex];
    const dieElement = document.getElementById('die');
    dieElement.textContent = 'Rolling...';
  
    setTimeout(() => {
      const dieRoll = Math.floor(Math.random() * 6) + 1;
      dieElement.textContent = dieRoll; // needs to update from the roll referenced above in the specific roll of die not the random search
      log(`${player.name} rolled a ${dieRoll}.`);
  
      // Update instructions based on the die roll
      const instructionElement = document.getElementById('instruction');
      if (dieRoll >= 1 && dieRoll <= 3) {
        instructionElement.textContent = 'Press "Draw Item Card".';
      } else if (dieRoll >= 4 && dieRoll <= 5) {
        instructionElement.textContent = 'Press "Draw Lucky Event Card".';
      } else {
        instructionElement.textContent = 'Press "Take a Risk" or "Pass".';
      }
    }, 1000);
  }

  function drawItemCard() {
    const player = players[currentPlayerIndex];
    const cardIndex = Math.floor(Math.random() * itemCards.length);
    const drawnCard = itemCards.splice(cardIndex, 1)[0]; // Remove the card from the itemCards array
    log(`${player.name} drew an item card: ${drawnCard.name}`);

    // Check if the drawn item card matches the quest card
    if (player.questCard[drawnCard.type] === drawnCard.name) {
        // Check if the card of this type has already been collected
        if (!player.collectedCards.some(card => card.type === drawnCard.type)) {
            player.collectedCards.push(drawnCard); // Add the drawn card to collected cards
            log(`It's a match! ${player.name} collected the ${drawnCard.type} card.`);
            updatePlayerCardsField(drawnCard.type, drawnCard.name); // Update only the matching field
        } else {
            log(`Duplicate found. ${player.name} already has the ${drawnCard.type} card.`);
        }
    } else {
        log(`${player.name} did not match the ${drawnCard.type} card.`);
    }
    updateRemainingCards();
    updateInstructions('Press "Roll Die" to continue.');
}

function updatePlayerCardsField(type, name) {
    const cardElement = document.getElementById(`${type.toLowerCase()}-card`);
    cardElement.textContent = `${type}: ${name}`;
}

  
  
function drawLuckyEventCard() {
    const player = players[currentPlayerIndex];
  
    // Check if Lucky Event cards are available
    if (luckyEventCards.length === 0) {
        updateInstructions('No Lucky Event cards left. Press "Roll Die" to continue.');
        return;
    }
  
    const cardIndex = Math.floor(Math.random() * luckyEventCards.length);
    const drawnCard = luckyEventCards.splice(cardIndex, 1)[0];
    log(`${player.name} drew a lucky event card: ${drawnCard.name}`);
  
    // Add the drawn lucky event card to the player's collection
    player.collectedCards.push({ type: 'Lucky Event', name: drawnCard.name });
    updateLuckyEventCards(player); // Only update lucky event cards display
    updateInstructions('Press "Roll Die" to continue.');
    updateRemainingCards();
}


/*
function updatePlayerCards() {
    const player = players[currentPlayerIndex];
    const playerCardsElement = document.getElementById('player-cards');
    playerCardsElement.innerHTML = ''; // Clear the display first

    // Create card elements for Quest Card types: Talent, Education, Experience, Opportunity
    ['Talent', 'Education', 'Experience', 'Opportunity'].forEach(type => {
        const card = player.collectedCards.find(card => card.type === type);
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = card ? `${type}: ${card.name}` : `${type}: Not yet acquired`;
        playerCardsElement.appendChild(cardElement);
    });

    // Display Lucky Event cards in their own field
    const luckyCard = player.collectedCards.find(card => card.type === 'Lucky Event');
    const luckyCardElement = document.getElementById('lucky-event-cards');
    luckyCardElement.innerHTML = ''; // Clear previous content
    const luckyCardDiv = document.createElement('div');
    luckyCardDiv.className = 'card';
    luckyCardDiv.textContent = luckyCard ? `Lucky Event: ${luckyCard.name}` : `Lucky Event: None`;
    luckyCardElement.appendChild(luckyCardDiv);
}
*/
function updatePlayerCards() {
    const player = players[currentPlayerIndex];

    // Clear previous cards
    const questTypes = ['Talent', 'Education', 'Experience', 'Opportunity'];
    questTypes.forEach(type => {
        const cardElement = document.getElementById(`${type.toLowerCase()}-card`);
        const collectedCard = player.collectedCards.find(card => card.type === type);
        
        // Update the text content only if the specific card type has been collected
        if (collectedCard) {
            cardElement.textContent = `${type}: ${collectedCard.name}`;
        } else {
            // Only set to "Not yet acquired" if it hasn't been set already
            if (cardElement.textContent.includes("Not yet acquired")) {
                cardElement.textContent = `${type}: Not yet acquired`;
            }
        }
    });

    // Update Lucky Event cards
    updateLuckyEventCards(player); // Make sure this function is defined as shown in the previous messages
}


function updateLuckyEventCards(player) {
    // Find all lucky event cards collected by the player
    const luckyCards = player.collectedCards.filter(card => card.type === 'Lucky Event');
    const luckyCardContainer = document.getElementById('lucky-event-cards');
    luckyCardContainer.innerHTML = ''; // Clear current lucky cards

    // Append new lucky event cards to the container
    luckyCards.forEach(luckyCard => {
        const luckyCardElement = document.createElement('div');
        luckyCardElement.className = 'card';
        luckyCardElement.textContent = `Lucky Event: ${luckyCard.name}`;
        luckyCardContainer.appendChild(luckyCardElement);
    });
}

  
  function updateInstructions(message) {
    const instructionElement = document.getElementById('instruction');
    instructionElement.textContent = message;
  }
  

  function takeRisk() {
    const player = players[currentPlayerIndex];
    if (player.collectedCards.length > 0) {
        // The player chooses to discard one of their collected Item Cards
        const discardedCardIndex = player.collectedCards.findIndex(card => card.type !== 'Lucky Event');
        if (discardedCardIndex > -1) {
            const discardedCard = player.collectedCards.splice(discardedCardIndex, 1)[0];
            log(`${player.name} discarded a ${discardedCard.type} card to take a risk.`);
        } else {
            log(`${player.name} has no Item Cards to discard and cannot take a risk.`);
            return; // Exit the function if there are no Item Cards to discard
        }

        // Player rolls the die again
        const newRoll = Math.floor(Math.random() * 6) + 1;
        log(`${player.name} rolled a ${newRoll} after taking a risk.`);

        if (newRoll >= 1 && newRoll <= 3) {
            drawItemCard(); // Draw an Item Card
        } else if (newRoll >= 4 && newRoll <= 5) {
            drawLuckyEventCard(); // Draw a Lucky Event Card
        } else {
            log(`${player.name} rolled a 6 and loses their turn.`);
            // The player loses the turn, so you would handle turn passing here
            passTurn();
        }
    } else {
        log(`${player.name} has no Item Cards to take a risk.`);
    }
}

function passTurn() {
    // Log that the player has chosen to pass
    log(`${players[currentPlayerIndex].name} has chosen to pass their turn.`);
    updateInstructions(`Roll the dice to continue.`);
}


function initializeGame() {
  players.sort(() => Math.random() - 0.5);
  log("Game details goes here.");
  currentPlayerIndex = 0;
  setCurrentPlayerInfo();
  updateInstructions('Press "Roll Die" to begin.');
  updatePlayerInfo();
  updateRemainingCards();
}

function setCurrentPlayerInfo() {
    const currentPlayer = players[currentPlayerIndex];
    document.getElementById('player-info').textContent = `Current Player: ${currentPlayer.name}`;
  }

function updatePlayerInfo() {
  const player = players[currentPlayerIndex];
  const questCardElement = document.getElementById('quest-card');
  questCardElement.innerHTML = `<h3>${player.name}'s Quest Card</h3>`;
  for (const property in player.questCard) {
    questCardElement.innerHTML += `<p>${property}: ${capitalizeFirstLetter(player.questCard[property])}</p>`;
  }
}

function updatePlayerCards() {
    const player = players[currentPlayerIndex];
    document.getElementById('talent-card').textContent = `Talent: ${capitalizeFirstLetter(player.questCard.Talent)}`;
    document.getElementById('education-card').textContent = `Education: ${capitalizeFirstLetter(player.questCard.Education)}`;
    document.getElementById('experience-card').textContent = `Experience: ${capitalizeFirstLetter(player.questCard.Experience)}`;
    document.getElementById('opportunity-card').textContent = `Opportunity: ${capitalizeFirstLetter(player.questCard.Opportunity)}`;
  }

function updateRemainingCards() {
  document.getElementById('item-deck-count').textContent = `Cards remaining: ${itemCards.length}`;
  document.getElementById('lucky-event-deck-count').textContent = `Cards remaining: ${luckyEventCards.length}`;
}

function log(message) {
  const logElement = document.getElementById('log');
  logElement.innerHTML += `<p>${message}</p>`;
  logElement.scrollTop = logElement.scrollHeight; // Auto-scroll to the bottom
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Start the game
initializeGame();

