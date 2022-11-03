const data = [
	{
		id: 1,
		question: "Which of these fish is actually a fish ?",
		answers: [
			{answer: "swordfish", isCorrect: true},
			{answer: "jellyfish", isCorrect: false},
			{answer: "starfish", isCorrect: false},
			{answer: "crayfish", isCorrect: false},
		]
	},
	{
		id: 2,
		question: "A flutter is a group of",
		answers: [
			{answer: "bees", isCorrect: false},
			{answer: "penguins", isCorrect: false},
			{answer: "butterflies", isCorrect: true},
			{answer: "camels", isCorrect: false},
		]
	},
	{
		id: 3,
		question: "A group of which animals is referres to as a wake ?",
		answers: [
			{answer: "bats", isCorrect: false},
			{answer: "vultures", isCorrect: false},
			{answer: "ants", isCorrect: true},
		]
	},
];

const gameScreen = document.querySelector('.game');
const resultScreen = document.querySelector('.result');
const question = document.querySelector('.question');
const answerContainer = document.querySelector('.answers');
const question_length = document.querySelector('.question-length');
const submit = document.querySelector('.submit');
const congratulations = document.querySelector('.congratulations');
const play = document.querySelector('.play');

let questionIndex = 0;
let correctCount = 0;
let wrongAnswer = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {
	questionIndex = 0;
	correctCount = 0;
	wrongAnswer = 0;
	selectedAnswer;
	total = 0;
	showQuestion(questionIndex);
}

play.addEventListener('click', () => {
	resultScreen.style.display = "none";
	gameScreen.style.display = "block";
	playAgain();
})

const showResult = () => {
	total = (correctCount * 100 / data.length).toFixed(2);
	resultScreen.style.display = "block";
	gameScreen.style.display = "none";
	congratulations.textContent = total > 50 ? "Congratulations" : "Sorry";

	resultScreen.querySelector('.correct').textContent = `Correct Answer: ${correctCount}`;
	resultScreen.querySelector('.wrong').textContent = `Wrong Answer: ${wrongAnswer}`;
	resultScreen.querySelector('.score').textContent = `Score: ${total}`;
}

const showQuestion = (qNumber) => {
	questionIndex === data.length && showResult();
	selectedAnswer = null;
	question.textContent = data[qNumber].question;
	answerContainer.innerHTML = data[qNumber].answers.map((item, index) =>
		`<div class="answer">
			<input name="answer" type="radio" id=${index} value=${item.isCorrect}>
			<label for=${index}>${item.answer}</label>
		</div>`
	).join("");
	question_length.textContent = `${questionIndex + 1}/${data.length}`
	submit.textContent = questionIndex + 1 === data.length ? "Submit" : "Next";
	selectAnswer();
}

const selectAnswer = () => {
	answerContainer.querySelectorAll('input').forEach((el) => {
		el.addEventListener('click', (e) => {
			selectedAnswer = e.target.value;
		})
	})
}

const submitAnswer = () => {
	submit.addEventListener('click', () => {
		if (selectedAnswer ===  null) {
			alert("please pick an answer")
		} else {
			selectedAnswer === 'true' ? correctCount++ : wrongAnswer++
			questionIndex++;
			selectedAnswer = 0;
			showQuestion(questionIndex);
		}

	})
}

showQuestion(questionIndex);
submitAnswer();