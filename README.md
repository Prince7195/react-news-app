Check Live: https://prince7195.github.io/react-news-app/

Starting:

https://nodejs.org/en/

https://facebook.github.io/react/

https://github.com/facebookincubator/create-react-app

React and ES6 Fundamentals:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

https://facebook.github.io/react/docs/lists-and-keys.html

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer

https://facebook.github.io/react/docs/state-and-lifecycle.html

https://facebook.github.io/react/docs/handling-events.html

https://en.wikipedia.org/wiki/Higher-order_function

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

https://facebook.github.io/react/docs/components-and-props.html

Styling with react-bootstrap:

https://react-bootstrap.github.io/getting-started.html

API, Lifecycle and Events: 

https://hn.algolia.com/api

https://facebook.github.io/react/docs/state-and-lifecycle.html

https://github.com/sebmarkbage/ecmascript-rest-spread

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator

https://facebook.github.io/react/docs/conditional-rendering.html

https://facebook.github.io/react/docs/events.html

Prototypes:

https://facebook.github.io/react/docs/typechecking-with-proptypes.html

https://facebook.github.io/react/docs/refs-and-the-dom.html

Higher order components:

https://lodash.com/

Lifting state:

https://facebook.github.io/react/docs/lifting-state-up.html

https://facebook.github.io/react/docs/state-and-lifecycle.html#using-state-correctly

React-routing:

https://reacttraining.com/react-router/web/guides/philosophy

github publishing:

https://help.github.com/articles/adding-a-file-to-a-repository-using-the-command-line/

https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/

How to publish:

Step1: Push all codes to the git hub

Step2: Add "hompage": "https://username.github.io/repository-name"   after the scripts object in the packet.json

Step3: Add basename="/repository-name" to the mainRouter element

Step4: In cmd run the command "npm run build" that it will create the production built file inside the project folder.

Step5: Again run the command "npm install --save-dev gh-pages" that is used to publish the project.

Step6: Add "predeploy": "npm run build", "deploy": "gh-pages -d build" inside the scripts json object in packet.json

Step7: Then run command "npm run deploy" in cmd inside the current project. It gives the message as "Published" if the process is successful.

Step8: Find the link for live of that app in the settings tab of that repository in Github pages container.

Open the link and see your output.