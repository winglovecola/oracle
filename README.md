# Oracle - Artificial Intelligent Fortune Teller

## Description

Oracle is a major MERN full-stack project that incorporates OpenAI to make predictions using Tarot Cards. As a quick explanation of Tarot cards, a user can ask a topic and a specific question relating to the topic. 3 cards are chosen out of a 78 Tarot card deck, with each card having unique meanings and keywords attached. Using a combination of the 3 cards' keywords/meanings, OpenAI will interpret your question and create a general prediction of the future.

Oracle is primarily built upon React as a singlular webpage application. It also additionally incorporates a Web Speech Recognition API to receive user voice inputs, as well as Google's Text-to-Speech API to have a computer-generated voice reading out the prediction results. MongoDB is used as a database for the tarot cards and then is queried for selecting cards. Using SASS and Tailwind CSS, animation and advanced CSS styling is used throughout the app. There is also a secure user login and shop page with payments powered by Stripe in order to accommodate 'Oracle Offerings' as purchases.

## Table of Contents

- [Installation](#installation)
- [Technology Dependencies](#technology-dependencies)
- [Usage](#usage)
- [Credits](#credits)
- [Heroku](#heroku)
- [Questions](#questions)

## Installation

Oracle is deployed and functioning at https://oracle-online.herokuapp.com/

Alternatively, you may download the contents of this repository, then save or unzip them into a single folder. Using Visual Studio Code, you can open that folder. Using the terminal, ensure the directory is in the root of the app folder. Then type "npm install" to install all the dependencies and libraries, which will take some time. Once everything is installed, type "npm run develop", the build will also take some time. Once completed, the application will eventually open a browser page on it's own or you can view the app on a browser at the url "http://localhost:3000/" by default, or the appropriate port you have designated.

## Technology Dependencies
APIs -- OpenAI API powering our Mysticism Technology // Web Speech Recognition API // Google Text-to-Speech API

Dependencies & Frameworks -- Syntactically Awesome Style Sheets // Tailwind CSS // React (Router, Table, Scripts) // JSON Web Token // Apollo & GraphQL // MongoDB // Stripe Payments

## Usage

Oracle is very simple to use. Simply begin by pressing the large "Explore" Icon in the bottom center of the page to advance to the 'Oracle Reading Room'. From here you can either allow access to a microphone connected to your device or type. The first user voice input prompt will accept either "Relationship" or "Career" to determine the nature of your prediction, then the second will ask for you to put in a more specific question. Then you can say your 3 numbers to select out of 78 cards in the Tarot deck. Afterwards, the AI will produce a prediction based on your input as well as the keywords associated with each tarot card.

![Preview of Oracle](/client/public/src/img/site/readme-instructional.png?raw=true "README Example")

## Credits

Primary Developers: 
Wing - https://github.com/winglovecola || John L. - https://github.com/johnxlai || Thomas T. - https://github.com/tranthom618

Coding guidance provided by the University of Toronto - School of Continuing Studies - Coding Bootcamp. Various class-activities and Teacher Assistants provided debugging advice. 

## Heroku

Heroku Deployed Live Site: https://oracle-online.herokuapp.com/

## Questions

Github Contact: 
Wing - https://github.com/winglovecola || John L. - https://github.com/johnxlai || Thomas T. - https://github.com/tranthom618