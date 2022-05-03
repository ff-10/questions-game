const questions = [{
                question: "How many students are there in EACAMP ?",
                variants: [13, 18, 14],
                trueAnswer: 14
        },
        {
                question: "Who created JavaScript ?",
                variants: ["Mark Zuckerberg", "Alan Turing", "Brendan Eich"],
                trueAnswer: "Brendan Eich"
        },
        {
                question: "What is type of 3.5 in JavaScript ?",
                variants: ["Integer", "Number", "Float"],
                trueAnswer: "Number"
        },
        {
                question: "2+2*2 = ?",
                variants: [6, 8, 4],
                trueAnswer: 6
        },
        {
                question: "Who is Lotfizadeh ?",
                variants: ["Software Engineer", "Mathematican", "Former President"],
                trueAnswer: "Mathematican"
        },
        {
                question: "What is type of Object in JavaScript ?",
                variants: ["String", "Object", "Function"],
                trueAnswer: "Object"
        },
        {
                question: "Which is world's most popular programming language ?",
                variants: ["Python", "JavaScript", "Java"],
                trueAnswer: "JavaScript"
        },
        {
                question: "How many bit have in a byte ?",
                variants: [8, 32, 64],
                trueAnswer: 8
        },
        {
                question: "What contains bits ?",
                variants: ["Strings", "Binary Numbers", "Booleans"],
                trueAnswer: "Binary Numbers"
        },
        {
                question: "Which company created React ?",
                variants: ["Google", "Instagram", "Facebook"],
                trueAnswer: "Facebook"
        },
]

let quesIndex = 0, trueAnswers = 0;

const startGameBtn = document.querySelector('.startGameBtn');

startGameBtn.addEventListener('click', () => {
        document.querySelector('.game').style.display = 'block'
        document.querySelector('.game-intro').style.display = 'none';
});

const domSide = {
        question: document.querySelector('.question'),
        variants: document.querySelectorAll('.var'),
        answeredQuestions: document.querySelector('.answeredQuestions'),

        updateQuestion(ques) {
                this.question.innerHTML = ques;
        },
        updateVariants(variants) {
            if (Array.isArray(variants) && variants.length === 3) {
                  for (let idx in variants) {
                  this.variants[idx].innerHTML = variants[idx];
                }
            }
        },
        updateAnsweredQuestions(count){
                count === 0 ? this.answeredQuestions.innerHTML = "Not any question answered yet." : this.answeredQuestions.innerHTML = `Answered ${count} of ${questions.length}`;
        },
        endGame(){
                document.querySelector('.variants').style.visibility = "hidden";
                this.answeredQuestions.style.display = "none";
                this.question.innerHTML = `
                Total Questions: ${questions.length} <br/> 
                True Answers: ${trueAnswers} <br/>
                Wrong Answers: ${questions.length - trueAnswers} </br>
                Score Percent: ${trueAnswers / questions.length * 100}%`;
        }
};

const setQuestion = (idx) => {
        if(idx === 10){
           domSide.endGame();
           return;
        }
        domSide.updateQuestion(questions[idx].question);
        domSide.updateVariants(questions[idx].variants);
        domSide.updateAnsweredQuestions(quesIndex);
}
setQuestion(quesIndex);

const checkAsnwer = (answer, questionIdx, element) => {
      if(answer == questions[questionIdx].trueAnswer){
              protectVariants(1);
              trueAnswers++;
              quesIndex++;

              element.target.classList.add('true');
              setTimeout(() => {
                      element.target.classList.remove('true');
                      setQuestion(quesIndex)
                      protectVariants(0);
                }, 1000);

      }else{
             protectVariants(true);
             let trueAnswer = Object.values(domSide.variants).filter(variant => variant.innerHTML == questions[questionIdx].trueAnswer);
             trueAnswer = trueAnswer[0];
             quesIndex++;

             element.target.classList.add('wrong');
             trueAnswer.classList.add('true');
             setTimeout(() => {
                     trueAnswer.classList.remove('true')
                     element.target.classList.remove('wrong');
                }, 1800);
             setTimeout(() => {
                     setQuestion(quesIndex);
                     protectVariants(0);
                }, 2000);
      }
}

const passAnswers = (variantsFromDom) => {
        return Object.values(variantsFromDom).map(variant => variant.addEventListener('click', event => checkAsnwer(event.target.innerHTML, quesIndex, event)));
}
passAnswers(domSide.variants);

//double click issue solved with CSS code.
const protectVariants = (lock) =>{
     if(lock){
        Object.values(domSide.variants).map(variant => variant.style.pointerEvents = "none");
     }else{
        Object.values(domSide.variants).map(variant => variant.style.pointerEvents = "auto");
     }
}