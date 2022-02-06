# Wordle in Spanish

## Intro

This repository contains a [vanilla version](https://stackoverflow.com/questions/20435653/what-is-vanillajs) of Wordle game with the aim of serving as a starting point for the participants of Vue.js training so they can create a Vue version of it as a first task. You can try it out [here](https://fgordillo.github.io/wordle/).

## What is wordle?

Wordle is a very simple game in which people are expected to guess a 5-letter word. The rules are simple:
- You have 6 attempts to guess the word.
- If the word you proposed is wrong but it contains letters from the word to be guessed, the letter will be highlighted in different colors:
  - <span style="color:green;font-weight:800;">Green</span> if the letter is in the right position
  - <span style="color:yellow;font-weight:800;">Yellow</span> if the letter is in the wrong position
- You can't use again letters that you tried and don't belong to the word to be guessed. Those letters will be marked in <span style="color:darkgray;font-weight:800">dark gray</span> in the keyboard.

There are some differences with the original game:
- The original game is limiting the players to play one game per day using a cookie to store the session. I decided not to implement that so you can play as many times as you feel like.
- This version doesn't track your answers so you can't see how many games you won or how many attempts you needed.
- This version doesn't include any feature in order to share your game result in your social media.
- Ideally this game should use calls to the backend to get the result of each attempt in a way that people inspecting the code wouldn't be able to get the word to be guessed. In this version, everything is in the frontend since it was just intended as a passtime for my parents 😅

## Tasks
1. Clone this project in your github repo
2. Define which components you will need to create this game in a [markdown file](https://www.markdownguide.org/cheat-sheet/). Include the following:
  - which components you will use and how they communicate with each other
  - where will the data/status of the game be stored.
3. Add Vue 3 to the project. You can follow the instructions in [here](https://v3.vuejs.org/guide/installation.html#npm).
4. Time to create a dummy version of the game. Create the components listed before. You can use the classes defined in `style.css` in case you are not a master of CSS. It's not expected yet for it to work, it just needs to render the elements in the page. If it's your first time using Vue, you can follow this [guide](https://docs.google.com/presentation/d/1kwSgJDDN_tTKJ0K9WZqd1MogN96ILHH4Ivkhhai0u1c/edit?usp=sharing) to understand how to use it or just [any tutorial available online](https://lmgtfy.app/?q=vue+3+first+steps).
5. Time to make it interactive. You will need to handle click events on the keyboard buttons in order to let the player write their words. As an extra, you can also listen to keyboard events (keyup? keydown?) so the player can also type from their keyboard.
6. Let's make the game work. You can adjust the class defined in `js/Wordle.js` or create your own. Since the vanilla version needs to take care of rendering and updating all the elements there is a lot of room for simplification once you use Vue for it.

## Extra tasks

The current version of the game has some parts not working fine that would be nice to fix them:
- Once a letter is used and it is not part of the word, you are not able to type it from the in-game keyboard but it's not disabled from the keyboard itself.
- Create some scoreboard so the player can see how they were doing in previous rounds.
- Make it easy to share their result on social media