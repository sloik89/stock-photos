## Setting up the envirentment variables

- .env in project directory
- .env REACT_APP_ACCESS_KEY
- proccess.env.REACT_APP_ACCESS_KEY in file

## Setting up the infinite scroll

- height of full page
  ```js
  document.body.scrollHeight;
  ```
- inner height

  ```js
  window.innerHeight;
  ```

- scroll from top
  ```js
  window.scrollY;
  ```

### Two urls

```js
const mainUrl = "https://api.unsplash.com/photos/";
const searchUrl = "https://api.unsplash.com/search/photos/";
```
