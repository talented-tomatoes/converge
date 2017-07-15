DROP DATABASE IF EXISTS converge;
CREATE DATABASE converge;
\c converge;
CREATE TABLE IF NOT EXISTS users( 
    id serial NOT NULL PRIMARY KEY, 
    loginid VARCHAR(100) NOT NULL,
    username  VARCHAR(100) NOT NULL, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
		img_url VARCHAR(1024), 
    emailid VARCHAR(100), 
    linkedinid VARCHAR(100),
		phonenumber VARCHAR(15),
    usertype VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS speakers(
	id serial NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL, 
  last_name VARCHAR(50) NOT NULL,
	jobtitle VARCHAR(50),
	avatar bytea,
	about VARCHAR(250),
	emailid VARCHAR(50),
	linkedinid VARCHAR(50),
	confid int 
); 

CREATE TABLE IF NOT EXISTS conferences(
	id serial NOT NULL PRIMARY KEY,
	confname VARCHAR(100) NOT NULL,
	address VARCHAR(200) NOT NULL,
	mapurl VARCHAR(100) NOT NULL,
	confimg bytea NOT NULL
);

CREATE TABLE IF NOT EXISTS presentations(
	id serial NOT NULL PRIMARY KEY,
	presentationname VARCHAR(100) NOT NULL,
	description VARCHAR(250) NOT NULL,
	presentationdate DATE NOT NULL,
	presentationtime TIME NOT NULL,
	speakerid references speakers(id),
	location VARCHAR(100) NOT NULL,
	conferenceid references conferences(id)
);
/* JOIN TABLES */
CREATE TABLE IF NOT EXISTS users_presentations(
	id serial NOT NULL PRIMARY KEY,
	userid references users(id),
	presentationid references presentations(id)
);

CREATE TABLE IF NOT EXISTS presentations_speakers(
	id serial NOT NULL PRIMARY KEY,
	presentationid references presentations(id),
	speakerid references speakers(id)
);

CREATE TABLE IF NOT EXISTS conferences_users(
	id serial NOT NULL PRIMARY KEY,
	conferenceid references conferences(id),
	userid references users(id)
);

/* DUMMY DATA */
/* USERS */
INSERT INTO "public"."users"("loginid", "username", "first_name", "last_name", "img_url", "emailid", "linkedinid", "phonenumber", "usertype") 
VALUES('padma123', 'padma', 'Padma', 'Govindarajalu', ' ', 'padma.govindarajalu@gmail.com', 'linkedin.com/padmag', '123-123-1234', 'user');

INSERT INTO "public"."users"("loginid", "username", "first_name", "last_name", "emailid", "linkedinid", "phonenumber") 
VALUES('alex123', 'alex', 'Alex', 'Chang', ' ',  'alex.chang@gmail.com', 'linkedin.com/alexc', '321-321-4321', 'user');

INSERT INTO "public"."users"("loginid", "username", "first_name", "last_name", "emailid", "linkedinid", "phonenumber") 
VALUES('ryan123', 'ryan', 'Ryan', 'Platon', ' ', 'ryan.platon@gmail.com', 'linkedin.com/ryanp', '121-121-1212', 'user');

INSERT INTO "public"."users"("loginid", "username", "first_name", "last_name", "emailid", "linkedinid", "phonenumber") 
VALUES('wilson123', 'wilson', 'Wilson', 'Cen', ' ', 'wilson.cen@gmail.com', 'linkedin.com/wilsonc', '112-112-1122', 'user');

/* SPEAKERS */

INSERT INTO "public"."speakers"("first_name", "last_name", "jobtitle", "avatar", "about", "emailid", "linkedinid", "confid") 
VALUES('Aaron', 'Irizarry', 'Senior Product Designer', ' ', 'Aaron Irizarry is a Senior Product Designer for Nasdaq OMX, a lover of heavy metal, a foodie, and a master of BBQ arts. You can find some of his thoughts and presentations on the conversation surrounding design over at discussingdesign.com.',  'aaron.Irizarry@gmail.com', 'linkedin.com/aaron', 1);

/* CONFERENCES */

INSERT INTO "public"."conferences"("confname", "address", "mapurl", "confimg")
VALUES("AWS", "475 Sansome St, San Francisco, California 94111", "", "");

/* PRESENTATIONS*/

INSERT INTO "public"."presentations"("presentationname", "description", "presentationdate", "presentationtime", "speakerid", "location", "conferenceid")
VALUES('Crafty Coding', 'Garment design doesn’t have to be intimidating. Learn the math behind knitting a sweater and program a fully customizable pattern generator in NodeJS. You will leave with your own unique pattern app to share with the world! Basic programming and knitting skills are recommended for this workshop.', '2017-07-29', '11:00', 1, 'Floor1', 1);