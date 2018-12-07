# The Full Stack To-Do App

## Tasks
* Create a front end that allows a user to create a Task.
* When the Task is created, it should be stored inside of a database (SQL)
* Whenever a Task is created, edited, or deleted the front end should refresh to show the updated list.
* Each Task should have an option to 'Complete', 'Edit', or 'Delete'.
* Whether or not a Task is complete should also be stored in the database.
* Deleting a Task should remove it both from the front end as well as the Database.

### Techs Used
* Javascript
* jQuery
* Node.js
* Express.js
* Bootstrap


### Setup
1. Run `npm install` in the terminal
2. Create a database named `weekend-to-do-app`
3. Run the following SQL:
```SQL
CREATE TABLE list (
	id serial PRIMARY KEY,
	task varchar(300) NOT NULL,
	completed varchar(15) NOT NULL
);
```
4. Reference the test data inserts located in the database.sql file 

## Future Versions
- Edit Button

- User authentication

- Make more mobile friendly

- Voice recognition to add tasks

