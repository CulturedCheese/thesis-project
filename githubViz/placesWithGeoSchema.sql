CREATE TABLE placesWithGeo (
user_location VARCHAR(255),
latitude FLOAT(10,6),
longitude FLOAT(10,6),
latLongPoint POINT,
countryCode VARCHAR(10),
ID int(10) NOT NULL auto_increment,
PRIMARY KEY (ID));
