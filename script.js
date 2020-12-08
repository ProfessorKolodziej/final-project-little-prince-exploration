

//Button go back top
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// Open Close nav 
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//for the quiz
var myQuestions = [
	{
		question: "1. How many moons does Mars have?",
		answers: {
			a: '2'+'\r\n',
			b: '1'+'\r\n',
			c: '50'+'\r\n',
      d:'13'+'\r\n',
		},
		correctAnswer: 'a'
	},
	{
    question: " 2. What percentage of the earth surface is covered with water?",
		answers: {
			a: '50%'+'\r\n',
			b: '60%'+'\r\n',
			c: '70%'+'\r\n',
      d: '80%'+'\r\n',
		},
		correctAnswer: 'c'
	},
  {
    question: "3. What is the largest planet in the solar system?",
		answers: {
			a: 'Mars'+'\r\n',
			b: 'Venus'+'\r\n',
			c: 'Jupiter'+'\r\n',
      d: 'Saturn'+'\r\n',
		},
		correctAnswer: 'c'
	},
  {
    question: "4. What is the closest planet to sun?",
		answers: {
			a: 'Mars'+'\r\n',
			b: 'Venus'+'\r\n',
			c: 'Earth'+'\r\n',
      d: 'Mercury'+'\r\n',
		},
		correctAnswer: 'd'
	},
    {
    question: "5. What planet has the clearest ring on it?",
		answers: {
			a: 'Neptune'+'\r\n',
			b: 'Uranus'+'\r\n',
			c: 'Jupiter'+'\r\n',
      d: 'Saturn'+'\r\n',
		},
		correctAnswer: 'b'
	},
  
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('button');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;

		// for each question...
		for(var i=0; i<questions.length; i++){
			
			// first reset the list of answers
			answers = [];

			// for each available answer...
			for(letter in questions[i].answers){

				// ...add an html radio button
				answers.push(
					'<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
						+ letter + ': '
						+ questions[i].answers[letter]
					+ '</label>'
				);
			}

			// add this question and its answers to the output
			output.push(
				'<div class="question">' + questions[i].question + '</div>'
				+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
	}


	function showResults(questions, quizContainer, resultsContainer){
		
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelectorAll('.answers');
		
		// keep track of user's answers
		var userAnswer = '';
		var numCorrect = 0;
		
		// for each question...
		for(var i=0; i<questions.length; i++){

			// find selected answer
			userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
			
			// if answer is correct
			if(userAnswer===questions[i].correctAnswer){
				// add to the number of correct answers
				numCorrect++;
				
				// color the answers green
				answerContainers[i].style.color = 'lightgreen';
			}
			// if answer is wrong or blank
			else{
				// color the answers red
				answerContainers[i].style.color = 'lightgrey';
			}
		}

		// show number of correct answers out of total
		resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    
    //redirect if all correct& show up a "try again" if not getting it correct
    if (numCorrect == 5){
    window.location.href="UnlockTheFox.html";
    }
    else{  
     document.getElementById("continue").addEventListener("click", function(event){
    alert('Try again to unlock the fox!');   
    event.preventDefault()
});
  }    
  }
  

  

	// show questions right away
	showQuestions(questions, quizContainer);
	
	// on submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
  }