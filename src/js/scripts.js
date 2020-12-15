// Button go back top
const mybutton = document.getElementById('myBtn');

// When the user scrolls down 20px from the top of the document, show the button

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

window.addEventListener('scroll', scrollFunction);

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

document.getElementById('myBtn').addEventListener('click', topFunction);

// Open Close nav
function openNav() {
  document.getElementById('mySidenav').style.width = '250px';
}
document.getElementById('openNav').addEventListener('click', openNav);

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}
document.getElementById('closeNav').addEventListener('click', closeNav);

// for the quiz
const myQuestions = [
  {
    question: '1. How many moons does Mars have?',
    answers: {
      a: '2\r\n',
      b: '1\r\n',
      c: '50\r\n',
      d: '13\r\n',
    },
    correctAnswer: 'a',
  },
  {
    question: ' 2. What percentage of the earth surface is covered with water?',
    answers: {
      a: '50%\r\n',
      b: '60%\r\n',
      c: '70%\r\n',
      d: '80%\r\n',
    },
    correctAnswer: 'c',
  },
  {
    question: '3. What is the largest planet in the solar system?',
    answers: {
      a: 'Mars\r\n',
      b: 'Venus\r\n',
      c: 'Jupiter\r\n',
      d: 'Saturn\r\n',
    },
    correctAnswer: 'c',
  },
  {
    question: '4. What is the closest planet to sun?',
    answers: {
      a: 'Mars\r\n',
      b: 'Venus\r\n',
      c: 'Earth\r\n',
      d: 'Mercury\r\n',
    },
    correctAnswer: 'd',
  },
  {
    question: '5. What planet has the clearest ring on it?',
    answers: {
      a: 'Neptune\r\n',
      b: 'Uranus\r\n',
      c: 'Jupiter\r\n',
      d: 'Saturn\r\n',
    },
    correctAnswer: 'b',
  },
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('button');

function generateQuiz(
  questions,
  quizcontainer,
  resultscontainer,
  submitButton,
) {
  function showQuestions(questions, quizContainer) {
    // we'll need a place to store the output and the answer choices
    const output = [];
    let answers;

    // for each question...
    for (let i = 0; i < questions.length; i += 1) {
      // first reset the list of answers
      answers = [];

      // for each available answer...
      /* global letter */
      /* eslint no-undef: "error" */
      for (letter in questions[i].answers) {
        // ...add an html radio button
        answers.push(
          `${'<label>'
            + '<input type="radio" name="question'}${
            i
          }" value="${
            letter
          }">${
            letter
          }: ${
            questions[i].answers[letter]
          }</label>`,
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question">${
          questions[i].question
        }</div>`
          + `<div class="answers">${
            answers.join('')
          }</div>`,
      );
    }
    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(Questions, quizContainer, resultsContainer) {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let userAnswer = '';
    let numCorrect = 0;

    // for each question...
    for (let i = 0; i < questions.length; i += 1) {
      // find selected answer
      userAnswer = (
        answerContainers[i].querySelector(
          `input[name=question${i}]:checked`,
        ) || {}
      ).value;

      // if answer is correct
      if (userAnswer === questions[i].correctAnswer) {
        // add to the number of correct answers
        numCorrect += 1;

        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      // if answer is wrong or blank
      } else {
        // color the answers red
        answerContainers[i].style.color = 'lightgrey';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;

    // redirect if all correct& show up a "try again" if not getting it correct
    if (numCorrect === 5) {
      window.location.href = 'UnlockTheFox.html';
    } else {
      document
        .getElementById('continue')
        .addEventListener('click', (event) => {
          alert('Try again to unlock the fox!');
          event.preventDefault();
        });
    }
  }

  // show questions right away
  showQuestions(questions, quizContainer);

  // on submit, show results
  submitButton.onclick = function () {
    showResults(questions, quizContainer, resultsContainer);
  };
}
generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
