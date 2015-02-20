//this is the query we're running on google BigQuery to get the raw data downloaded into our mysql instance. 

select 
  repository_url,
  repository_language,
  actor_attributes_login,
  actor_attributes_location
from [githubarchive:month.201412]
where
    (
      type = 'PushEvent'
      OR type = 'ForkEvent'
      OR (type = 'IssuesEvent' AND (payload_action="opened" OR payload_action=="reopened"))
      OR (type = 'CreateEvent' AND payload_ref_type="repository")
      OR type = 'WatchEvent'
    )
    AND repository_language !=''
    AND repository_url != ''
group by 
  repository_url,
  repository_language,
  actor_attributes_login,
  actor_attributes_location;

/* Query and Google BigQuery Parameters:
select repository_url, repository_language, actor_attributes_login, actor_attributes_location from [githubarchive:month.201412] where ( type = 'PushEvent' OR type = 'ForkEvent' OR (type = 'IssuesEvent' AND (payload_action="opened" OR payload_action=="reopened")) OR (type = 'CreateEvent' AND payload_ref_type="repository") OR type = 'WatchEvent' ) AND repository_language !='' AND repository_url != '' group by repository_url, repository_language, actor_attributes_login, actor_attributes_location;
Query Text:
select 
  repository_url,
  repository_language,
  actor_attributes_login,
  actor_attributes_location
from [githubarchive:month.201412]
where
    (
      type = 'PushEvent'
      OR type = 'ForkEvent'
      OR (type = 'IssuesEvent' AND (payload_action="opened" OR payload_action=="reopened"))
      OR (type = 'CreateEvent' AND payload_ref_type="repository")
      OR type = 'WatchEvent'
    )
    AND repository_language !=''
    AND repository_url != ''
group by 
  repository_url,
  repository_language,
  actor_attributes_login,
  actor_attributes_location;
Job ID: culturedcheese2015:job_LnrvA24eCwP_JiLD70jVhGzx-mA
Start Time: 4:12pm, 12 Feb 2015
End Time: 4:12pm, 12 Feb 2015
Bytes Processed: 990 MB
Destination Table: culturedcheese2015:thesis2.201412RepoLanguageByUserAndLocationLargeResults
Write Preference: Overwrite table
Allow Large Results: true
Flatten Results: true
Priority: Interactive
*/
