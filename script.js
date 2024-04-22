const startbtn = document.querySelector('.start-btn');
const popup = document.querySelector('.pop-up');
const exitbtn = document.querySelector('.exit');
const main = document.querySelector('.main');
const continuebtn = document.querySelector('.continue');
const quizsection = document.querySelector('.quiz-section');
const quizbox=document.querySelector('.quiz-box');
const resultbox = document.querySelector('.result-box');
const tryAgainBtn= document.querySelector('.tryagain-btn');
const goHomeBtn= document.querySelector('.gohome');

startbtn.onclick = ()=>{
    popup.classList.add('active');
    main.classList.add('active');
}
exitbtn.onclick = ()=>{
    popup.classList.remove('active');
    main.classList.remove('active');
}
continuebtn.onclick=()=>{
    quizsection.classList.add('active');
    popup.classList.remove('active');
    main.classList.remove('active');
    quizbox.classList.add('active');
    showQuestion(0);
    questionCounter(1);
    headerscore();
}

const next= document.querySelector('.next');

next.onclick=()=>{

  if(questionCount<questions.length-1){
      questionCount++;
      showQuestion(questionCount);
      questionNumb++;
      questionCounter(questionNumb);

      next.classList.remove('active');
    }
    else{
        console.log("Questions completed");
        resultboxshow();
    }
}

tryAgainBtn.addEventListener("click", ()=>{
    resultbox.classList.remove('active');
    quizbox.classList.add('active');
    next.classList.remove('active');

    questionCount=0;
    questionNumb=1;
    userScore=0;
    showQuestion(questionCount);
    questionCounter(questionNumb);
    headerscore();

})

goHomeBtn.addEventListener("click", ()=>{
    resultbox.classList.remove('active');
    quizsection.classList.remove('active');
    next.classList.remove('active');

    questionCount=0;
    questionNumb=1;
    userScore=0;
    showQuestion(questionCount);
    questionCounter(questionNumb);
    headerscore();
})

const optionList=document.querySelector('.option-list');

let questionCount=0;
let questionNumb=1;
let userScore=0;
// getting questions and option list from array

function showQuestion(index){
    const questionText=document.querySelector('.question-text');
    questionText.textContent=`${questions[index].numb}. ${questions[index].question}`;

    let optiontag=`<div class="option"><span>${questions[index].Option[0]}</span></div>
    <div class="option"><span>${questions[index].Option[1]}</span></div>
    <div class="option"><span>${questions[index].Option[2]}</span></div>
    <div class="option"><span>${questions[index].Option[3]}</span></div>`;

    optionList.innerHTML=optiontag;

    const option = document.querySelectorAll('.option');
    for(let i=0;i<option.length;i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let alloptions=optionList.children.length;
    if(userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore+=1;
        headerscore(userAnswer);
    }else{
        answer.classList.add('incorrect');
    // if selected Answer is incorrect then auto select take place
    for( let i=0;i<alloptions;i++){
        if(optionList.children[i].textContent==correctAnswer){
            optionList.children[i].setAttribute('class', 'option correct');
        }
      }
    }

    // for disabling other options
  for( let i=0;i<alloptions;i++){
    optionList.children[i].classList.add('disabled');
  }
   
  next.classList.add('active');

}
// for counting the number of question

function questionCounter(index){
    const questionTotal=document.querySelector('.question-total');
    questionTotal.innerHTML=`${index} of ${questions.length} questions`;
}
function headerscore(){
    const headerScoretext=document.querySelector('.quiz-score');
    headerScoretext.textContent=`Score: ${userScore} / ${questions.length}`;
}

function resultboxshow(){
    quizbox.classList.remove('active');
    resultbox.classList.add('active');

    const scoretext= document.querySelector('.score-text');
    scoretext.textContent=`Your score ${userScore} out of ${questions.length}`

    const circularValue= document.querySelector('.circular-progress');
    const  progressValue= document.querySelector('.progress-value');
    let progressStartValue=-1;
    let progressEndValue= (userScore/questions.length) *100;
    let speed=20;

    let progress= setInterval(()=>{
        progressStartValue++;
       console.log(progressStartValue);
       progressValue.textContent=`${progressStartValue}%`
       circularValue.style.background = `conic-gradient(#604a4a ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
       if(progressStartValue==progressEndValue){
        clearInterval(progress);
       }
    }, speed)
}



