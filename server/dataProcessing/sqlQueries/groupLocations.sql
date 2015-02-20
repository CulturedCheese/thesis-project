-- outer query pulls the user location and the total number of users at that location. 
SELECT user_location, COUNT(user_login)
FROM (
  -- subquery returns a table that the outer query then runs it's outer query on.
  -- subquery simply returns a unique list of users, and their location. 
  SELECT user_location, user_login
  FROM raw_data_import
  GROUP BY user_login
) as placesCountByUser
GROUP BY user_location
ORDER BY COUNT(user_login) desc;
