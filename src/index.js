// DOM selector
const cardsContainer = document.getElementById("cards-container")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const currentEl = document.getElementById("current")
const showBtn = document.getElementById("show")
const hideBtn = document.getElementById("hide")
const questionEl = document.getElementById("question")
const answerEl = document.getElementById("answer")
const addQuestionBtn = document.getElementById("add-question")
const clearBtn = document.getElementById("clear")
const addContainer = document.getElementById("add-container")

// Keep track of current card
let currentActiveCard = 0 // Which card to show

// Store DOM cards
const cardsEl = [] // Store cards as objects in array

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
    cardsEl.push(card)

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
    window.location.reload() // Targeting the BOM - to reflect cards data on the DOM
}

createCards()

// Event Listeners

// Next button
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left'
    currentActiveCard = currentActiveCard + 1 // If we are at 1 it will be 2 and so on

    // We need to set the index on the last card
    if (currentActiveCard > cardsEl.length - 1) { // our array is a 0 index base
        currentActiveCard = cardsEl.length -1
    }

    cardsEl[currentActiveCard].className = 'card active' // Sets the next card to active by overwriting with class

    updateCurrentText() // To update the card numbers
})

// Prev button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right'
    currentActiveCard = currentActiveCard - 1

    // Need conditional to prevent overflow i.e. below 0 index
    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }

    cardsEl[currentActiveCard].className = 'card active'

    updateCurrentText()
})

// Show add container
showBtn.addEventListener('click', addContainer.classList.add('show'))

// Hide add container
hideBtn.addEventListener('click', addContainer.classList.remove('show'))

// Add new card
addQuestionBtn.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value
    console.log(question, answer)

    if (question.trim() && answer.trim()) {
        const newCard = {question, answer}

        createCard(newCard)

        questionEl.value = ''
        answerEl.value = ''

        addContainer.classList.remove('show')

        cardsData.push(newCard)
        setCardsData(cardsData)
    }
})

// Clear button
clearBtn.addEventListener('click', () => {
    localStorage.clear() // Clears local storage
    cardsContainer.innerHTML = ''
    window.location.reload() // Reloads browser window
})
