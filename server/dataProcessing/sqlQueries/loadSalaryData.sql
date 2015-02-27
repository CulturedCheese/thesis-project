load data infile '~/ghLocal/thesis-project/db2/developerSalariesWorldBank.csv' 
into table 14raw_data_import 
character set latin1 
fields terminated by ',' 
enclosed by '"' 
lines terminated by '\n';
