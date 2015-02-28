-- this will likely only work in the MySQL shell. 
-- this is untested so far. do not trust that it works yet. 
-- i can't figure out how to make this work, so i'll just do it in javascript
SELECT repository_language, countryCode, activeReposByLang, actor_attributes_login, country_rank
FROM ( 
  SELECT 
    repository_language, 
    @repository_language = repository_language,
    countryCode, 
    activeReposByLang, 
    actor_attributes_login,
    @current_country := countryCode,
    @country_rank := IF(@current_country = countryCode & @repository_language = repository_language, @country_rank + 1, 1) AS country_rank
  FROM 14users 
  ORDER BY countryCode, repository_language, activeReposByLang DESC 
) ranked 
WHERE country_rank <= 10
LIMIT 1000;