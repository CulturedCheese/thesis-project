-- This loads all the data in the specified file into the table. If issues, make sure the sql modes property is empty.
load data infile '~/ghLocal/thesis-project/githubViz/201412export1.csv' 
into table raw_data_import 
character set latin1 
fields terminated by ',' 
enclosed by '"' 
escaped by '\\' 
lines terminated by '\n' 
starting by '' 
ignore 1 lines;

