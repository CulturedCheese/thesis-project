-- insert into just says put the following data into the places table as the two listed columns. 
INSERT INTO places (user_location, user_location_count)
-- what we're inserting into that table is the result from this following select query. this query is detailed in groupLocations.sql
SELECT user_location, COUNT(user_location)
FROM (
  SELECT user_location, user_login
  FROM raw_data_import
  GROUP BY user_login
) as placesCountByUser
GROUP BY user_location
ORDER BY COUNT(user_location) desc;
