![CRAX](https://raw.githubusercontent.com/philopian/crax/master/logo.png)
- Create React App Xtras


# Using
1. Create a React app and add CRAX
  ```
  $ npx create-react-app my-app
  $ npm i -D crax
  ```
  
2. Update the package.json scripts
  ```json
    "scripts": {
      "crax": "crax"
    },
  ```

3. Run the CRAX commands
  - setup:
    ```
    $ npm run crax init
    ```
    - This will creat a `.crax` file in the root of your application

  - Create new react components
    ```
    $ npm run crax component
    ```