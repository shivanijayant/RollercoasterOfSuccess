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

