load data infile '~/ghLocal/thesis-project/db2/devSalariesHourly.csv' 
into table salaries 
character set latin1 
fields terminated by ',' 
enclosed by '"' 
lines terminated by '\n'
ignore 1 rows;
