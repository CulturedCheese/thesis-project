-- This loads all the data in the specified file into the table. If issues, make sure the sql modes property is empty.
load data infile '~/ghLocal/thesis-project/githubViz/201412export1.csv' 
into table raw_data_import 
character set latin1 
fields terminated by ',' 
enclosed by '"' 
escaped by '\\' 
lines terminated by '\n' 
starting by '' 
ignore 1 lines;

-- This loads the data into our places table:
load data infile '~/ghLocal/thesis-project/db/first40kLatLong.csv' 
into table placesWithGeo
character set latin1
fields terminated by ',' 
enclosed by '"' 
lines terminated by '\r'
ignore 1 lines
(@name, @Lat, @Long)  --this lays out the columns in the file that we will be using later for our calculations and Set portion
SET 
  user_location= @name, --this sets the user_location column in our MySQL database equal to the current value of the name column from our infile
  latitude= @Lat,
  longitude= @Long,
  latLongPoint= PointFromWKB(POINT(@Lat,@Long));
-- character set latin1 
-- escaped by '\\' 
-- ignore 1 lines;
-- lines terminated by '\n' 
-- starting by '' 

