const icons = ["EC2", "S3", "Lambda", "DynamoDB", "RDS", "Amplify", "Cloud9", "Bedrock"];
const gameIcons = [...icons, ...icons];  // Duplicate icons for matching pairs
gameIcons.sort(() => Math.random() - 0.5);  // Shuffle icons

let firstClick = null;
let secondClick = null;

function setupBoard() {
    const gameBoard = document.getElementById("game-board");
    gameIcons.forEach((icon, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.addEventListener("click", () => onCardClick(card));
        gameBoard.appendChild(card);
    });
}

function onCardClick(card) {
    if (firstClick && secondClick) return;  // Prevent more than two cards at a time
    card.textContent = card.dataset.icon;  // Show icon

    if (!firstClick) {
        firstClick = card;
    } else if (card !== firstClick) {
        secondClick = card;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstClick.dataset.icon === secondClick.dataset.icon) {
        // If match, disable further clicks on matched cards
        firstClick.removeEventListener("click", onCardClick);
        secondClick.removeEventListener("click", onCardClick);
        resetClick();
    } else {
        // If not match, hide icons after a short delay
        setTimeout(() => {
            firstClick.textContent = "";
            secondClick.textContent = "";
            resetClick();
        }, 1000);
    }
}

function resetClick() {
    firstClick = null;
    secondClick = null;
}

// Initialize the game board
setupBoard();
