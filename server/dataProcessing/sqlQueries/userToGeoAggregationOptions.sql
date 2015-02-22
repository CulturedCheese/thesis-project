--this query creates a table that is already grouped up to the countryCode language
-- this version IS NOT PREFERRED. see notes below on the preferred version for why.
-- CREATE TABLE 14countriesResults
--   SELECT 
--     COUNT(actor_attributes_login) AS programmerCount, 
--     SUM(activeReposByLang) AS repoCount, 
--     repository_language, 
--     countryCode 
--   FROM raw_data_import AS users 
--   LEFT OUTER JOIN placesWithGeo AS places 
--     ON users.actor_attributes_location = places.user_location 
--   GROUP BY countryCode, repository_language;

--this query just duplicates the users table and adds in the countryCode for each user
--this is the preferred option. it takes the same amount of time to do the users-to-countryCode join no matter what, but this way we have the results stored so we can run all kinds of future queries against this data without having to do the join again. 
--while this is slightly denormalized, it is not a substantial storage burden, and saves a SIGNIFICANT computation burden. 
--an example of a followup query we might have to do is total programmers by country, rather than grouped up to language like we have here.
CREATE TABLE 13UsersWithCountries 
  SELECT MAX(activeReposByLang) AS activeReposByLang, repository_language, actor_attributes_login, actor_attributes_location, countryCode
  FROM 13raw_data_import AS users 
    LEFT OUTER JOIN placesWithGeo AS places 
      ON users.actor_attributes_location = places.user_location;
  GROUP BY actor_attributes_login, repository_language;

