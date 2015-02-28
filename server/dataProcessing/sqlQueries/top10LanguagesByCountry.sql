SELECT repository_language, countryCode, activeProgrammers 
FROM ( 
  SELECT 
    repository_language, 
    countryCode, 
    activeProgrammers, 
    @country_rank := IF(@current_country = countryCode, @country_rank + 1, 1) AS country_rank, 
    @current_country := countryCode 
  FROM 14countries 
  ORDER BY countryCode, activeProgrammers DESC 
) ranked 
WHERE country_rank <= 10;
