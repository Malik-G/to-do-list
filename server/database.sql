--Database name: weekend-to-do-app

CREATE TABLE list (
	id serial PRIMARY KEY,
	task varchar(300) NOT NULL,
	completed varchar(15) NOT NULL
);

INSERT INTO list (task, completed)
VALUES ('Cook breakfast', 'Yes');

INSERT INTO list (task, completed)
VALUES ('Morning stretching', 'Yes');

INSERT INTO list (task, completed)
VALUES ('Meal prep for the week', 'No');

