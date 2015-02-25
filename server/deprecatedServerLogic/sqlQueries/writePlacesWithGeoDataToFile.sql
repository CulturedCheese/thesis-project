SELECT * FROM placesWithGeo
INTO OUTFILE '~/ghLocal/thesis-project/db/placesWithGeoExportForBigQuery.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
