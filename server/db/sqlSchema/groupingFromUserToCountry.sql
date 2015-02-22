CREATE TABLE 14countriesResults
  SELECT 
    COUNT(actor_attributes_login) AS programmerCount, 
    SUM(activeReposByLang) AS repoCount, 
    repository_language, 
    countryCode 
  FROM raw_data_import AS users 
  LEFT OUTER JOIN placesWithGeo AS places 
    ON users.actor_attributes_location = places.user_location 
  GROUP BY countryCode, repository_language;
  