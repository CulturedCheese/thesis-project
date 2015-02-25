-- this loads our user-aggregated data from BigQuery to raw_data_import
load data infile '~/ghLocal/thesis-project/db2/201411_all_data_grouped_to_user_by_lang.csv' 
into table 14raw_data_import 
character set latin1 
fields terminated by ',' 
enclosed by '"' 
lines terminated by '\n';
