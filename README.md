This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Word guessing game
Please implement a word guessing game, which can be played by a user "against" the computer. This is a game where the secret-keeper (in this case, the computer) thinks of a word, and the guesser (the user) tries to guess it one letter at a time. The guesser has six guesses. If the guesser guesses a letter which is part of the word, the secret-keeper will reveal all occurrences of that letter in the word. If the guesser guesses a correct letter such that all letters are now revealed, the game is over and player 2 has won. Instead if player 2 runs out of guesses before the whole word is discovered, the game is over and player 1 has won. Check out https://en.wikipedia.org/wiki/Hangman_(game) for more details.
### Game rules
- At the start of the game the computer/secret-keeper will choose a dictionary word
- The guesser loses the game if they guess 6 letters that are not in the secret word
- The guesser wins the game if they guess all letters in the secret word correctly and have
not already lost the game per the conditions above
### User Interface
Any type of user interface is acceptable (command line, mobile app, web page etc) but the player must have a way of interacting with your game including:
- The length of the secret word is displayed to the guesser (e.g. as a set of underscores)
- As the guesser makes correct guesses, occurrences of the guessed letter in the word
are shown while unknown letters are still hidden
- The number of guesses remaining is displayed
- A list of incorrect guesses are displayed
### Implementation
- Your program must retrieve a dictionary list of words from the word dictionary REST API provided (see attached documentation)
- You can choose whichever combination of programming languages, tools, frameworks, and libraries you find appropriate within reason (e.g. you can’t use a game framework that implements Hangman)
 
### Extension
Apart from the above requirements, everything else is up to you. We also encourage you to think of these requirements as a starting point, and just use your creativity/imagination to expand the game in any way that you want to showcase your talents and passion for programming. Sample extension ideas include:
- Track users/scores over time and show a leaderboard
- Add support for guessing full words instead of just letters one at a time, and count those
against the guesses total
- Add support for phrases instead of just words, and numbers in addition to letters
- Create a diagram (that can be drawn with 6 attempt) that gets filled in as the user
guesses incorrectly
- Add a configurable “difficulty level” and adjust the words that are used based on the
user’s preference
- Anything else that you come up with to make the game more fun/interesting!

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
