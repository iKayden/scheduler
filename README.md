# Interview Scheduler

Simple interview scheduler which a user can book, edit, and cancel an interview.

# Screenshots

- This is the way the Scheduler looks at the first glance. !["screenshot of initial look"]("public/images/github/gh1.png")
- We can add an appointment to any free spot !["screenshot of booking a new appointment"]("public/images/github/gh2.png")
- We can write down you name and choose an interviewer, it can be edited later! (Validation is present)
- As soon as we are done with our appointment we can save it to our database. !["screenshot of saving the new appointment"]("public/images/github/gh3.png")
  !["saved"]("public/images/github/gh4.png")
- Whenever it saved it will be displayed. If we hover over we will see extra options. One of them is to delete an appointment.
  !["screenshot of completed appointment."]("public/images/github/gh5.png")
- After we confirmed our cancellation we will see an animation with the process! !["After we confirmed our cancellation we will see an animation with the process!"]("public/images/github/gh6.png")

## Setup

Fork this repository, then clone your fork of this repository.
Install dependencies with `npm install`.

To setup a database server, please visit: https://github.com/iKayden/scheduler-api

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

React
Node 5.10.x or above
Axios
React-dom
Cypress
