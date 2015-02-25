-- this query groups our user data up to the country level.
-- the replace() query comes from the fact that our countryCodes have both 'US' and 'US \n' with some kind of a newline character in it.
-- removing char 10 and 13 removes two different newline characters
CREATE TABLE 14countries
  SELECT replace(replace(countryCode,char(10),''),char(13),'') AS countryCode, SUM(activeReposByLang) AS activeRepos, COUNT(actor_attributes_login) AS activeProgrammers, repository_language
  FROM 14users_with_country3
  GROUP BY countryCode, repository_language;
