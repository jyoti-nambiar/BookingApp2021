# BookingApp2021

This App was developed using npm 7.15.0 and react project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This Project is a ReactJS Project with Strapi used for its backend which demonstrates the following,

1. Creating functional Component in React
2. Managing State of components
3. React routing
4. Strapi setup
5. Strapi Api endpoints: Retrieve and push data
6. JWT token used for authentication & authorization
7. Stripe integration for payment using card

## Getting Started

1. Clone project and install dependencies.

- git clone
- cd bookingapp2021
- cd bookingapp2021
- npm install
- npm start
  -- Runs the app in the development mode.\
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

2. Create your Strapi account and follow the guidelines in https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html.
3. Set up your relational database with the tables to store your app user details, user-bookings & services.
4. Create your Stripe account in https://dashboard.stripe.com/register.
5. Create a new project in https://dashboard.stripe.com/test/dashboard
6. Copy config set up using https://stripe.com/docs/checkout/integration-builder
7. Get started with using the app using npm start.
8. You can register as an authenticated user by filling in details with the register link.
9. Admin & a user login have been created for this application with following credentials:
   login email || admin@gmail.com || user@gmail.com
   password || admin || user

## Live Application URL

The Application is deployed on (https://spikspan-app.herokuapp.com/)

Click on the link to see the application

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
