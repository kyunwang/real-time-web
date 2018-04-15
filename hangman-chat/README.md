# Hangman Chat
A simple chat with hangman where you can play hangman in with others.

![hangman gif](kev_app.gif)

# Table of Content
- [Getting started](#getting-started)
- [How to build](#how-to-build)
- [Features](#features)
- [Whats used](#whats-used)
- [To Do](#to-do)

# Getting started
Here is how to get started:
1. Clone the repo `git clone https://github.com/kyunwang/real-time-web.git` or download it.
2. Navigate to the hangman folder `cd hangman-chat`
3. Run `npm install` or `yarn`
4. Do a `npm start`
5. Go to [localhost:3100](localhost:3100) and you are ready to go.

# How to build
Follow these steps to build the project for production:

# Features
This app contains the following features:
- You can chat in a chatroom.
- You can set a temporary username for the chatroom
- You can play hangman with other in the chatroom
	- You can guess with a letter by typing `/hangman <Your letter>`
	- You can guess the word by typing `/hangman word <Your word>`

# Whats used
- [Socket.io](https://socket.io/)
- [Pug](https://pugjs.org/api/getting-started.html)

# To Do
- [x] Finishing the app, making the game real like hangman.
- [ ] Attach the wordAPI for random words
- [ ] Ability to restart the game when finished
- [ ] Give feedback to the user if a letter has already been guessed
- [ ] Show the users already guessed words
- [ ] Add lives to the game (10 lives)
