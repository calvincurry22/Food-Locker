# FoodLocker
Video Demo Link : https://www.loom.com/share/2a7d18c52ab14210a0381186e4e34f0a

Food Locker is a multi-user app that allows food establishment owners/managers
to log and track the food safety-related data and performance of their business.
Users can store health inspection records, manage employee credentials & certifications, 
create tasks for their employees, and receive access to the latest in relevant food safety information.

## Technologies Used
- C#
- ASP.NET Web API & Entity Framework for accessing the database
- SQL Server for database management
- React using "hooks" for client-side application build
- React Router for navigation
- ChartJs for data visualization
- Material UI for component design
- Cloudinary (for image uploading)

## App Setup: Follow these steps exactly
*Must have node.js, Visual Studio and SQL Server installed on local machine*

1. Clone this repository onto your local machine. 
2. From the terminal, `cd ` into the directory that this project creates.
3. Run Visual Studio
4. Set up the SQL API: SQL Create and Seed Data are inside the SQL folder
5. install npm
6. Start Application through Visual Studio
7. In the terminal, `cd` into the client sub-directory and run `npm start`  
to view the app in the browser at `http://localhost:3000`.
8. When the app is setup successfully, you will see the FoodLocker login page in the browser. 

## Navigating the App

1. First click on the `Sign Up` button to register your first account
2. Enter your information then click the `Register` button - this will log you into FoodLocker
3. Explore our features:
- Upon login, you will view the dashboard. This page displays a snapshot of all activity that has
occurred within the app. If audit records, tasks, and employee credentials have been stored into the system, 
then you will view information about those items here.
- The Audit Records page is where you can create reports based on your results from any health inspections conducted at your 
establishment. You can view a list of all audit records, and clicking on the DETAILS button will show more detailed info, 
including two charts that visualize data from the audit. 
- The Employee Credentials page will allow you to enter new employees into the system and add information about their 
food safety-related certifications. 
- The Tasks page is where users can create tasks and assign them to specific employees with expiration dates. 
- The Food Safety Resources page provides a list of web links to FDA/USDA resources that may be helpful for 
the needs of the business.
- Click on the setting button in the top right corner of the page to edit your user account information. 



