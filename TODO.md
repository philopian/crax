
# Todos
- [x] init 
- [x] new component
  - [x] hooks
  - [x] class
  - [x] function
  - [] better styles options (css/scss/stylus) examples
- [] eslint
- [] storybook after the fact
- [] help
- [] add tests


# Using CRAX
```
$ npx create-react-app my-app
$ npm i -D crax
$ crax init
```
- Package.json script
```json
  "scripts": {
    "new:component": "crax component"
  },
```


# Dev Notes
- link this repo locally
  ```
  $ cd crax
  $ npm link
  $ npm list -g --depth 0
  ```

- Use this linked repo locally
  ```
  $ cd my-app
  $ npm link crax
  ```