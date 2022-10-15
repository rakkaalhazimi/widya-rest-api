# Widya REST API
REST API application to test user login and registration. User can see their profile using secure token from [JWS](https://www.npmjs.com/package/jws).

You can use the deployed app here : https://widya-rest-test.herokuapp.com/

<br>

## Requirements
- **NodeJs** - Javascript runtime environment


<br>

## Main Library Used
- **Express** - Backend web framework
- **MongoDB** - NoSQL database

<br>

## Installation
1. Clone this repository
    ```
    git clone https://github.com/rakkaalhazimi/widya-rest-api
    ```
2. Move to cloned directory
    ```
    cd widya-rest-api
    ```
3. Install packages with npm
    ```
    npm install
    ```
4. Run the server
   ```
    npm run dev
   ```

<br>

## Examples
After you run the server, take a look at `app.http` file. It contains http request examples for login, register and show profile. If you are using [VSCode](https://code.visualstudio.com/) you can try to install [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) plugins.

<br>

You can either read this or jump straight into the [documentation](#documentation).

1. For the starter you can try to send request to main url to see what it shows you.
    ```
    curl GET http://localhost:3000
    ```

2. How about try to register account ? let's look at the register endpoint to search for a clue.
    ```
    curl GET http://localhost:3000/register
    ```

3. Now, let's try to register our account by using several data.
   ```
    curl POST http://localhost:3000/register -H "Content-Type: application/json" -d "{\"username\":\"test@email.com\",\"password\": \"xxx\",\"confirmPassword\":\"xxx\",\"fullName\":\"John Doe\",\"gender\":\"Female\"}"
   ```

   It seems that we failed to create an account, that is because we need to meet every inputs format. We can see the right format if we go to the [documentation](#documentation).

   I recommend you to use API Platform like [Postman](https://www.postman.com/).

<br>

## [Documentation](#documentation)
The rest of the documentations lies here:

### ```\```
- GET Request - show REST API main page.

<br>

### ```\register```
- POST Request - pefrom login into server.  
    **json params:**
  - username - valid email format.
  - password - 8 characters containing 1 lowercase, uppercase, digit and special character.
  - confirmPassword.
  - fullName - your fullname.
  - gender - whether male or female.

<br>

### ```\login```
- POST Request - perform login and get login token.  
    **json params:**
  - username - valid email format.
  - password - 8 characters containing 1 lowercase, uppercase, digit and special character.
  
<br>

### `\profile`
- GET Request - show user profile  
    **Authorization**: Bearer [`Login Token`]
