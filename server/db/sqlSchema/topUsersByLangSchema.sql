-- creates a table for our top users by lang for each country
-- the users field is going to be stored as a text string
-- it is an array of objs, with the username and activeRepos as it's keys
-- the array is sorted by most active users for that language for that country
CREATE TABLE topUsersByLang (
  countryCode VARCHAR(2),
  language VARCHAR(25),
  users TEXT,
  ID int(10) NOT NULL auto_increment,
PRIMARY KEY (ID));
