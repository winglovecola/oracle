/* eslint-disable no-undef */
import React, { useState, useEffect  } from 'react';
import wordsToNumbers from 'words-to-numbers';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import '../styles/fortuneTelling.css';

let questionNum = 1;
let myQuestionType = '';
let myQuestion = '';
let myThreeNumber = [];



var music, auFootstep;
var recAnswer, recAnswerInterim, recConfidence;
var answerDivCopy = [];

let threeNumberSpeechGrammarArray = [];


let tarotCardTellingStarted = false;
//upload photos


function FuntuneTelling() {
  
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [oracleQuestion, setOracleQuestion] = useState ('');
  const [answerDiv, setAnswerDiv] = useState ([]);



  useEffect(() => {
    const keyDownHandler = event => {
      

      if (event.key === 'Enter') {
        
        //console.log('User pressed: ', event.key, document.getElementById("my-quetsion-input").value);
        event.preventDefault();
        
        question3Setup (document.getElementById("my-quetsion-input").value);
        document.getElementById("my-quetsion-input").disabled = true;

      
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };


  }, []);

  const addAnswerDiv = (newAnswerDiv) => {


    answerDivCopy.push (newAnswerDiv);

    setAnswerDiv(answerDivCopy);

    forceUpdate ();
  };


  //QUESTIONS SETUP
  function question2Setup (answer) {

    if (questionNum === 1)
    {
      myQuestionType = answer;
    
      setOracleQuestion ("Tell me the question you have in mind?");
    
      const qSound2 = document.getElementById("au-question2");
      qSound2.play();

      addAnswerDiv (<div id="answer2-div"><input id="my-quetsion-input" name="my-question-input" type="input" placeholder="Input your question and hit ENTER"/></div>);


      questionNum = 2;
    }
  }

  function pickCardNum (cardnum) {

    console.log (cardnum);

    //document.getElementById('cardnum' + cardnum).classList.add("itemPicked");

    if (cardnum === undefined || isNaN(cardnum))
      return;

    if (myThreeNumber.indexOf (cardnum) === -1)
    {
      myThreeNumber.push(cardnum);

      if (myThreeNumber.length > 3)
      {
        myThreeNumber.shift(); //remove when more than 3 item
    
        const elements = document.getElementsByClassName('cardNumDiv');
        // Loop through the list of elements and remove the class
        for (let i = 0; i < elements.length; i++) {

          elements[i].classList.remove('itemPicked');
        }
      }

      myThreeNumber.forEach ((item) => {
        if (document.getElementById('cardnum' + item))
          document.getElementById('cardnum' + item).classList.add("itemPicked");
      }) 
    }
    console.log (myThreeNumber)
  }


  function question3Setup (answer) {

    if (questionNum === 2)
    {

      myQuestion = answer;
      setOracleQuestion ('From 1 to 78, tell me the 3 numbers that first came to your mind.');

      document.getElementById("my-quetsion-input").value = myQuestion;
      
      const qSound3 = document.getElementById("au-question3");
      qSound3.play();

      let cardDivObj = [];
      for (let i = 1; i <= 78; i++) {
        
        cardDivObj.push (<div id={"cardnum" + i} className="cardNumDiv" onClick={() => {
          pickCardNum (i);
         }}>{i}</div>)
      }

      addAnswerDiv (<div> {cardDivObj.map((divItem, index) => (divItem))} </div>);

      questionNum = 3;
    }
  }




  function gameStart () {

    auFootstep = document.getElementById("au-footstep");
    music = document.getElementById("music");

    document.getElementById('dungeon-div').style.animation = "zoom-in 20s ease infinite";
    document.getElementById('start-btn').style.display = "none";

    
    music.play();
    auFootstep.play();

    setTimeout (oraclePalace,6000)
  }





  function setPlayerAnswer (elementId, questionNum, answer) {

    // eslint-disable-next-line eqeqeq
    if (questionNum == 1) {

      if (myQuestionType === '')
      {
        myQuestionType = answer;
        //console.log (myQuestionType)
        //document.getElementById(elementId).classList.add("itemPicked");

        if (answer === "relationship")
          document.getElementById('a1-career').style.display = "none";
        else
          document.getElementById('a1-relationship').style.display = "none";

        question2Setup ();
      }
    }
  }
  


  function oraclePalace () {

    document.getElementById('dungeon').style.animation = "fadeout 5s";
    setTimeout (meetOracle, 5000);

  }

  function meetOracle () {
    //document.getElementById('dungeon-div').style.animation = "";
    //document.getElementById('dungeon').style.animation = "";
    auFootstep.pause();


    document.getElementById('dungeon').style.animation = "";
    document.getElementById('dungeon-div').style.display = "none";
    
  
    document.getElementById('oracle-questions').style.display = "block";
    setOracleQuestion ("It's destiny that we meet. What type of questions you have in mind?");

    var qSound1 = document.getElementById("au-question1");
    qSound1.play();
  }


  function audioEned () {
    if (questionNum === 1)
    {

      //<center><img src="/src/img/magic/giphy.gif"></center>
      addAnswerDiv (<div id="answer1-div">
      <div id="a1-relationship" className="playerAnswerSelect" onClick={() => {
       setPlayerAnswer ('a1-relationship', 1, 'relationship')
      }}>Relationship</div>
      
      <div id="a1-career" className="playerAnswerSelect" onClick={() => {
       setPlayerAnswer ('a1-career', 1, 'career')
      }}>Career</div>
      </div>);


      oracleListen (['relationship', 'career']);
    }
    else if (questionNum === 2)
    {
      oracleListen ([]);
    }
    else if (questionNum === 3)
    {
      music.volume = 0.2;
      oracleListen ([], {interimResults: true, maxAlternatives: 1, continuous: true}); //array from 1 to 78 as the grammar keyword
    }

  }



  //SPEECH RECOGNITION
  const SpeechRecognition = webkitSpeechRecognition;
  const SpeechGrammarList = webkitSpeechGrammarList;
  const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;
  
  let recognition, speechRecognitionList, filterCardNum;

  function oracleListen (keywords = [], options = {interimResults: false, maxAlternatives: 1, continuous: true})
  {
    console.log ("oracle listening");
    recAnswerInterim = "";
    recAnswer = "";
    recConfidence = 0;



      /* const grammar = `#JSGF V1.0; grammar keyword; public <keyword> = ${keywords.join(
        " | "
      )};`; */
    
      if (recognition)
        recognition.stop();

      recognition = new SpeechRecognition();
      
      //speechRecognitionList = new SpeechGrammarList();
  
      //speechRecognitionList.addFromString(grammar, 1);

      //recognition.grammars = speechRecognitionList; 
      recognition.lang = "en-US";


      //console.log (options)
      recognition.continuous = options.continuous;
      recognition.interimResults = options.interimResults;
      //recognition.maxAlternatives = options.maxAlternatives;


      recognition.start();
  



      recognition.onresult = (event) => {
        //recAnswer = event.results[0][0].transcript;

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            recAnswer = event.results[i][0].transcript;
          } else {
            recAnswerInterim += event.results[i][0].transcript + ' ';
          }
        }

        recConfidence = event.results[0][0].confidence;

        if (questionNum === 1)
        {
          if (recAnswer === 'relationship' || recAnswer === 'career')
          {
            setPlayerAnswer ('a1-' + recAnswer, 1, recAnswer);
            
            question2Setup (recAnswer);
          }
        }
        else if (questionNum === 2)
        {
          if (recConfidence > 0.6)
          {
            question3Setup (recAnswer);
          }
        }
        else if (questionNum === 3)
        {
          //if (recConfidence > 0.8)
          //{
            
          if (recAnswer)
            //myThreeNumber.push (recAnswer);
   
            filterCardNum = wordsToNumbers(recAnswer);

            pickCardNum (filterCardNum);
  
            //setAnswerDiv (myThreeNumber.toString());

            
          //}

          if (myThreeNumber.length >= 3)
          {
            tarotCardTellingStarted = true;
            recognition.stop();
          } 
          else
          {
            //console.log (Array.from({length: 78}, (_, i) => i + 1));
            
            oracleListen (threeNumberSpeechGrammarArray,  {interimResults: true, maxAlternatives: 1, continuous: true}); 
          }
        }

        console.log ("questionNum" + questionNum);
        console.log (event.results);

        console.log ("recAnswerInterim: " + recAnswerInterim);

        console.log(`Confidence: ${recConfidence}`);
        console.log (myThreeNumber);

        
      };
  
      recognition.onspeechend = () => {
        recognition.stop();
        //console.log ("recognition.stop");

        if (questionNum === 3)
        {

          if (myThreeNumber.length < 3)
          {
            oracleListen (threeNumberSpeechGrammarArray,  {interimResults: true, maxAlternatives: 1, continuous: true}); 
          }
        }


      };
  
      recognition.onnomatch = (event) => {
        console.log ("I didn't recognize your question");
      };
  
      recognition.onerror = (event) => {

        console.log (`Error occurred in recognition: ${event.error}`);

      };
  }


/* 
  // dots is an array of Dot objects,
  // mouse is an object used to track the X and Y position
  // of the mouse, set with a mousemove event listener below

  var dots = [],
    mouse = {
      x: 0,
      y: 0
  };

  // The Dot object used to scaffold the dots
  var Dot = function() {
    this.x = 0;
    this.y = 0;
    this.node = (function(){
    var n = document.createElement("div");
    n.className = "trail";
    document.body.appendChild(n);

    return n;
  }());
  };
  // The Dot.prototype.draw() method sets the position of 
  // the object's <div> node
  Dot.prototype.draw = function() {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
  };

  // Creates the Dot objects, populates the dots array
  for (var i = 0; i < 12; i++) {
    var d = new Dot();
    dots.push(d);
  }

  // This is the screen redraw function
  function draw() {
    // Make sure the mouse position is set everytime
    // draw() is called.
    var x = mouse.x,
      y = mouse.y;

    // This loop is where all the 90s magic happens
    dots.forEach(function(dot, index, dots) {
      var nextDot = dots[index + 1] || dots[0];

      dot.x = x;
      dot.y = y;
      
      dot.draw();
      
      x += (nextDot.x - dot.x) * .6;
      y += (nextDot.y - dot.y) * .6;

    });
  }


  // animate() calls draw() then recursively calls itself
  // everytime the screen repaints via requestAnimationFrame().
  function animate() {

    draw();
    
    requestAnimationFrame(animate);
  }

  // And get it started by calling animate().
  //animate();
 */

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setOracleQuestion (value);
  };


  return (
    
    
    <div>
      <div id="dungeon-div"><div id="dungeon"></div></div>
      <div id="oracle-palace"><div id="oracle"></div></div>

      
      <audio id="music" loop onEnded={audioEned}>
        <source src="/src/music/mystery.mp3" type="audio/mpeg"/>
      </audio>

      <audio id="au-question1" onEnded={audioEned}>
        <source src="/src/sound/what-type-of-questions.mp3" type="audio/mpeg"/>
      </audio>

      <audio id="au-question2" onEnded={audioEned}>
        <source src="/src/sound/what-is-your-question.mp3" type="audio/mpeg"/>
      </audio>

      <audio id="au-question3" onEnded={audioEned}>
        <source src="/src/sound/tell-me-3-number.mp3" type="audio/mpeg"/>
      </audio>

      <audio id="au-footstep">
        <source src="/src/sound/footstep.mp3" type="audio/mpeg"/>
      </audio>

      <div id="start-btn" onClick={gameStart} style={{color:"black"}}><div className="btn-label">Explore</div></div>
      <div id="user-menu">
        <div id="hpbar" className="status-bar"><img src="/src/img/icons/hp.png" alt="" /></div>
        <div id="mpbar" className="status-bar"><img src="/src/img/icons/mp.png" alt="" /></div>
      </div>


      <div id="oracle-questions">
        <div id="oracle-quetsion-div">{oracleQuestion}</div>
       
        <div id="answer">{answerDiv.map((divItem, index) => (<div key={index}>{divItem}</div>))}</div>
      </div>
      
    </div>
  );
  //dangerouslySetInnerHTML={{__html: answer}}

  // <input id="oracle-quetsion-input" name="question" type="input" style={{textAlign:"center"}} onChange={handleFormChange} value={oracleQuestion}/>
}


export default FuntuneTelling;