-- this query grabs the most recent year's data for each country.
CREATE TABLE salaryByCountry
SELECT MAX(year), countryCodeThreeLetter, countryCodeTwoLetter, monthlyWageInDollars, ID
FROM salaries
GROUP BY countryCodeTwoLetter
ORDER BY MAX(year);
