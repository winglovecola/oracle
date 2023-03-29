import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import '../styles/fortuneTelling.css';

//upload photos


function FuntuneTelling() {
  
  const [question, setQuestion] = useState ('');
  const [answer, setAnswer] = useState ('');

  useEffect(() => {
    
    }, []);

    function audioEned () {

      document.body.style.backgroundImage = "url('/src/img/magic/giphy.gif')";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "100% 100%";

      //<center><img src="/src/img/magic/giphy.gif"></center>
      setAnswer (`<div>Relationship</div> <div>Career</div>`);


    }
  
    function audioStart () {
      setQuestion ("It's destiny that we meet. What type of questions you have in mind?");

      
      var sound1 = document.getElementById("au-question1");
      var music = document.getElementById("music");
   
      sound1.play();
      music.play();
    }
  

  return (
    <div>
      <audio id="au-question1" autoPlay onEnded={audioEned}>

        <source src="/src/sound/what-type-iof-questions.mp3" type="audio/mpeg"/>

      </audio>
      <audio id="music" loop autoPlay onEnded={audioEned}>

        <source src="/src/music/mystery.mp3" type="audio/mpeg"/>

      </audio>

<br/><br/>
<br/>


      <div id="oracle-div">
      <button name="start" onClick={audioStart} >Start</button>
      <br/>
      <br/>
      <br/>

      <input name="question" type="input" style={{textAlign:"center" }} value={question} size="150"/>
      <div id="answer" dangerouslySetInnerHTML={{__html: answer}}></div>
      </div>
      
    </div>
  );
}


export default FuntuneTelling;