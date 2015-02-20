SELECT repository_language, countryCode, totalActiveRepos
FROM (
  SELECT repository_language, countryCode, totalActiveRepos, 
    @country_rank := IF(@current_country = countryCode, @country_rank + 1, 1) AS country_rank, @current_country := countryCode 
  FROM countriesAggAll
  ORDER BY countryCode, totalActiveRepos DESC
) ranked
WHERE country_rank <= 10;


-- saves the same query to a csv file
SELECT * FROM (
  SELECT repository_language, countryCode, totalActiveRepos
  FROM (
    SELECT repository_language, countryCode, totalActiveRepos, 
      @country_rank := IF(@current_country = countryCode, @country_rank + 1, 1) AS country_rank, @current_country := countryCode 
    FROM countriesAggAll
    ORDER BY countryCode, totalActiveRepos DESC
  ) ranked
  WHERE country_rank <= 10
) AS tempResults
INTO OUTFILE '~/ghLocal/thesis-project/db/countriesAgg.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
