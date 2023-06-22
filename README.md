# BudgetBuddy

This is a web application built with Vue.js and Express.js that helps users to manage their daily expenses and savings. It also includes an authentication system to secure user accounts and data.

## Demo Draft

![image](https://github.com/Cywus98213/budgetBuddy/assets/91040918/748330ff-3209-4bbd-acde-0f9118524322)


## Live Demo
https://6493ce068c6e0a1af988a3e6--silver-toffee-714e93.netlify.app/




### Frontend

- Vue js
- CSS

### Backend

- Express
- MongoDB

### Hosting

- Netlify for the Frontend
- Heroku for Node js
- MongoDB Atlas

## Installation

To install BudgetBuddy, you can clone the repository and install all the dependencies using npm:

```
git clone https://github.com/Cywus98213/budgetBuddy.git
cd budgetBuddy
npm install
```

## Usage

For the server:

install all the dependencies using npm for the server:

```
cd server/
npm install
```

Run the server:

This will start the server and make the application available at http://localhost:3000.

```
npm start
```

For the client:

This will start the server and make the application available at http://127.0.0.1:5173.

The port may vary depends on your machines.

```
npm run dev
```

## Features

BudgetBuddy currently supports the following features:

- User authentication with JSON Web Tokens (JWT).
- Setting up monthly budget goals and savings targets.
- Adding transactions with categories and tags.
- Visualizing expenses with bar charts.
- Tracking expenses and savings progress.

## Known Issues

- The summary for the account every months and pdf functioin for user account summary not yet implement.
- The cron jobs for income plan check still work in progress.
- The application may not be optimized for performance and may have some slow loading times or other performance issues.
- There may be some bugs or errors that have not yet been identified or fixed.
- There is likely room for improvement in terms of best practices, coding standards, and overall quality of the code.

Please feel free to report any issues or bugs that you encounter while using the application.

## Contributing

BudgetBuddy is a self-practice project and is not currently accepting contributions.

## License

BudgetBuddy is released under the MIT License.
