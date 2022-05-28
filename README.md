# Draw Dice Game

> > **_To start_** in development mode:
> >
> > - ask developer for `.env` file
> > - start CORS with settings:
> >   - for at least `GET` method,
> >   - with `included` "Access-Control-Allow-Header"
> >   - with `origin` value of "Access-Control-Allow-Origin" settings)

<br/><hr/>

# TODO:

- create dice-api & server
- fix api/fetch test - issue with axios module mocking due to non-standard axios implementation with `axios.create` of util `axios-api.js`
- icon arrow-up & -down

<br/><hr/>

# Recruitment assignment

The task is to develop a simple game utilizing API http://roll.diceapi.com/ or https://deckofcardsapi.com/ .

## Game rules:

- Player has one dice/card at a time
- There are two buttons that the player uses to decide whether the next card/dice number will be higher or lower
- Once the player chooses one of the options, he/she gets 0.1 point for the correct answer and a new dice/card is shown
- There should be 30 rounds of the game

## Requirements:

- The card/dice should be represented by a picture
- History of all the rounds and results has to be created and shown
- The number of remaining rounds and the sum of points have to be visible
- Closing the app saves the current game
- If the game is resumed, the player gets a question “Reload the previous game?”
- If the player chooses “YES”, previously saved game is reloaded
- If the player chooses “NO”, a new game starts
- The project does not have time limitation, however it should not take more than a few hours
- Any tools, frameworks, librialiers or packages can be used to complete the task
- Submit the project the way you do when working with a team
- This repository is created exclusively for your recruitment process and you can interact with it the way you like

<hr/>

## Project setup

```
yarn
yarn prepare  // to install husky
```

> > To use git pre-commit of husky @ Webstorm/Idea for Win:
> >
> > - check Webstorm/Idea setting @ "Version Control > Git > Path to Git executable" which should be “C:\Program Files\Git\cmd\git.exe” (https://youtrack.jetbrains.com/issue/IDEA-214629)
> > - open GIT-console !!! (not regular terminal) to see information during pre-commit and commit

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Vue Test Utils with Jest

Thanks to:

https://v1.test-utils.vuejs.org/
