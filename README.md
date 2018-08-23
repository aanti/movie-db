
This simple app can help you to browse one of the best movie databases: **[themoviedb.org](http://themoviedb.org)**  
  ![enter image description here](https://raw.githubusercontent.com/aanti/movie-db/master/public/screen-1.png)
All you need to do to try it out is just:
````javascript
yarn install
yarn start
````

or alternatively:
````javascript
npm install
npm start
````

If you want to run tests and make sure that everything works as expected, just type:
````javascript
yarn test
````
or alternatively:
````javascript
npm test
````

Written in React with help of [Webpack](https://webpack.js.org/) module bunder,  [axios](https://github.com/axios/axios) for HTTP requests, composed of [Material-UI](http://www.material-ui.com/#/) components, styled with awesome [styled-components](https://www.styled-components.com) <3
  ![enter image description here](https://raw.githubusercontent.com/aanti/movie-db/master/public/screen-2.png)
Check also [documentation ](https://github.com/aanti/movie-db/blob/master/DOCUMENTATION.md).  
  
Note: For API request mechanism I'm using debounce (in order to decrease number of unnecessary API calls) with help of [David Walsh implementation](https://davidwalsh.name/javascript-debounce-function)  
  
Enjoy! &#9786;