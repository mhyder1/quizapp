'use strict';

const questionSet = [
   {number: 1,
    text: `“It was times like these when I thought my father, who hated guns and had never been to any wars, was the bravest man who ever lived.”`,
    ans1: `Jane Austen, Pride and Prejudice`,
    ans2: `Harper Lee, To Kill a Mockingbird`, 
    ans3: `Herman Melville, Moby Dick`, 
    ans4: `Mark Twain, Adventures of Tom Sawyer`,
    correctAnswer: `Harper Lee, To Kill a Mockingbird`
    },

    {number: 2,
    text: `“All animals are equal, but some animals are more equal than others.”`,
    ans1: `J.K. Rowling, Harry Potter & The Chamber of Secrets`, 
    ans2: `Unknown Author, The Epic of Gilgamesh`,
    ans3: `Jerry Pinkney, The Lion and The Mouse`, 
    ans4: `George Orwell, Animal Farm`,
    correctAnswer: `George Orwell, Animal Farm`
    }, 

    {number: 3,
    text: `“The darker the night, the brighter the stars. The deeper the grief, the closer is God!”`,
    ans1: `William Shakespeare, Romeo and Juliet`, 
    ans2: `George Orwell, 1984`, 
    ans3: `Fyodor Dostoyevsky, Crime and Punishment`, 
    ans4: `Leo Tolstoy, War and Peace`,
    correctAnswer: `Fyodor Dostoyevsky, Crime and Punishment`
    }, 

    {number: 4,
    text: `"What are men to rocks and mountains?"`,
    ans1: `Jane Austen, Pride and Prejudice`,
    ans2: `Ernest Hemingway, A Farewell To Arms`,
    ans3: `Mario Puzo, The Godfather`, 
    ans4: `Homer, The Odyssey`,
    correctAnswer: `Jane Austen, Pride and Prejudice`
    },

    {number: 5,
    text: `“There are more things in Heaven and Earth, Horatio, than are dreamt of in your philosophy.”`,
    ans1: `Homer, The Iliad`, 
    ans2: `Donte Alighieri, The Divine Comedy`, 
    ans3: `Barack Obama, The Audacity of Hope`, 
    ans4: `William Shakespeare, Hamlet`,
    correctAnswer: `William Shakespeare, Hamlet`
    }, 

    {number: 6,
    text: `”It does not do well to dwell on dreams and forget to live, remember that."`,
    ans1: `J.D. Salinger, The Catcher in the Rye`, 
    ans2: `J.K. Rowling, Harry Potter & The Sorcerer’s Stone`, 
    ans3: `Charles Dickens, Great Expectations`, 
    ans4: `William Faulkner, The Sound and the Fury`,
    correctAnswer: `J.K. Rowling, Harry Potter & The Sorcerer’s Stone`
    }, 

    {number: 7,
    text: `“If only it were all so simple! But the line dividing good and evil cuts through the heart of every human being. And who is willing to destroy a piece of his own heart?”`,
    ans1: `Niccolo Machiavelli, The Prince`, 
    ans2: `Mario Puzo, The Family`, 
    ans3: `Alexsandr Solzhenitsyn, The Gulag Archipelago`, 
    ans4: `Jonathan Smith, Gulliver’s Travels`,
    correctAnswer: `Alexsandr Solzhenitsyn, The Gulag Archipelago`
    }, 

    {number: 8,
    text: `“A dream, all a dream, that ends in nothing, and leaves the sleeper where he lay down, but I wish you to know that you inspired it."`,
    ans1: `Charles Dickens, A Tale of Two Cities`, 
    ans2: `Ernest Hemingway, Death In The Afternoon`, 
    ans3: `Marcel Proust, In Search of Lost Time`, 
    ans4: `Patrick Suskind, Perfume`,
    correctAnswer: `Charles Dickens, A Tale of Two Cities`
    }, 

    {number: 9,
    text: `“Respect was invented to cover the empty place where love should be.”`,
    ans1: `Mark Twain, Adventures of Huckleberry Finn`, 
    ans2: `Ernest Hemingway, The Old Man and The Sea`, 
    ans3: `Alexsandr Solzhenitsyn, One Day in The Life of Ivan Denisovich`, 
    ans4: `Leo Tolstoy, Anna Karenina`,
    correctAnswer: `Leo Tolstoy, Anna Karenina`
    }, 

    {number: 10,
    text: `“As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.”`,
    ans1: `Walt Whitman, Leaves of Grass`, 
    ans2: `Charles Dickens, David Copperfield`, 
    ans3: `Frank Kafka, The Metamorphosis`, 
    ans4: `Lewis Carroll, Alice’s Adventures in Wonderland`,
    correctAnswer: `Frank Kafka, The Metamorphosis`
    }
];


let questionNum = 1;
let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="region">
    
    <form>
      <fieldset>
      <legend>${question.text}</legend>
      <br>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  

      <button id="js-submit-button">Submit</button>

          <footer id="status-bar" role="contentinfo">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </footer>
  </form>
</section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

// Submit button
function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

// Check for correct answer
    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

// Next button
function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {
// If at question 10 show results page, or else move to next Q
    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

// Restart button
function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {
    questionNum = 1;
    correctAnswers = 0;
    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];
  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === questionSet[questionNum - 1].correctAnswer) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="region">
    <h1>Correct!</h1>
    <img src="https://i.gifer.com/2GzM.gif" alt="it's like, incredible trump gif">
    <button id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="region">
      <h1>Nope! It was ${questionSet[questionNum - 1].correctAnswer}!</h1>
      <img src="https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif" alt="you're wrong gif">
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}
function iterateCorrectAnswers() {
  correctAnswers++;
}

// Results page function & HTML
function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page" role="region">
      <h1>Final Score: You scored ${correctAnswers} out of 10</h1>
      <img src="https://media2.giphy.com/media/l3vR6c1DQiEwL0onu/source.gif" alt="it's over gif" class="center">
      <button id="js-restart-button">Restart Quiz?</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();