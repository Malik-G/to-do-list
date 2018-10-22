--Database name: weekend-to-do-app

CREATE TABLE list (
	id serial PRIMARY KEY,
	task varchar(300) NOT NULL,
	completed varchar(15) NOT NULL
);
