# BudgetBuddy

This is a web application built with Vue.js and Express.js that helps users to manage their daily expenses and savings. It also includes an authentication system to secure user accounts and data.

## Demo Draft

![image](https://github.com/Cywus98213/budgetBuddy/assets/91040918/748330ff-3209-4bbd-acde-0f9118524322)


## Live Demo
https://budgetbuddydemo.netlify.app/



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

Reflection:

- Building BudgetBuddy has been an enriching experience in my journey as a web developer. It allowed me to leverage Vue.js and Express.js to create a practical and user-friendly expense management and savings tracking tool. Throughout the development process, I honed my skills in frontend and backend technologies, and gained hands-on experience with authentication systems and database integration.

- One of the highlights of this project was implementing user authentication using JSON Web Tokens (JWT), ensuring the security of user accounts and data. I also incorporated features such as setting monthly budget goals, adding transactions with categories and tags, and visualizing expenses through interactive bar charts. These functionalities provide users with comprehensive tools to monitor and manage their finances effectively.

- Although BudgetBuddy is a work in progress, with areas such as the account summary and PDF functionality still being developed, I am proud of the foundation I have built. I am aware that there may be room for optimization and improvement in terms of performance and code quality. However, this project has allowed me to strengthen my understanding of best practices and coding standards.

- Overall, BudgetBuddy has been a significant learning opportunity, reinforcing my knowledge of full-stack web development and enhancing my ability to deliver practical solutions. I look forward to further refining and expanding this project, as well as applying the lessons learned to future endeavors in the dynamic world of web development.

## Future Enhancements
- PDF Summary: Implementing a PDF summary feature that allows users to generate and download a detailed summary of their spending patterns and financial insights.
- Enhanced Analytics: Integrating advanced analytics capabilities to provide users with comprehensive insights into their spending habits, trends, and personalized recommendations for better financial management.
- Enhanced User Management: Developing an admin panel that empowers business owners to easily manage their menu, track orders, and gain valuable insights into their business performance through a user-friendly dashboard.

## Contributing

BudgetBuddy is a self-practice project and is not currently accepting contributions.

## License

BudgetBuddy is released under the MIT License.
