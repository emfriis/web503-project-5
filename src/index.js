// DOM selector
const cardsContainer = document.getElementById("cards-container")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const currentEl = document.getElementById("current")
const showEl = document.getElementById("show")
const hideEl = document.getElementById("hide")
const questionEl = document.getElementById("question")
const answerEl = document.getElementById("answer")
const addQuestionBtn = document.getElementById("add-question")
const clearBtn = document.getElementById("clear")
const addContainer = document.getElementById("add-container")

// Keep track of current card
let currentActiveCard = 0 // Which card to show

// Store DOM cards
const cardEl = [] // Store DOM cards in array of elements

// Store card data
const cards = getCardsData()

// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index)) // Loop through data and creating an array of cards
}

// Create a single card in the DOM
function createCard() {
    const card = document.createElement('div') // Create element with tag div
    card.classList.add('card') // Adds 'card' class to card

    if (index === 0) { // If card is active card
        card.classList.add('active') // Adds 'active' class to card
    }

    card.innerHTML = // data.question? data.answer?
    `
    <div class="cards active">
      <div class="inner-card">
        <div class="inner-card-front">
          <p>
            ${data.question} 
          </p>
        </div>
        <div class="inner-card-back">
          <p>
            ${data.answer}
          </p>
        </div>
      </div>
    </div>
    `

    // Click to show answer
    card.addEventListener('click', () => card.classList.toggle('show-answer'))

    // Add to DOM cards
    cardEl.push(card)

    cardsContainer.appendChild(card)

    updateCurrentText()
}

// Show number of cards
function updateCurrentText() {
    currentElement.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards')) // Parses item cards from localStorage from string to JS object (array)
    return cards === null ? [] : cards // Returns cards if not null, if null returns empty array
}

// Add cards to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards)) // Convert cards array to string
    window.location.reload // Targeting the BOM - to reflect cards data on the DOM
}

createCards()