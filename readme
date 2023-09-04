## **How to use?**

 1. First you will need to signup via ***/user/signup*** route, you will
    then receive a JWT that you need to send in the http headers of the 
   request.
   2. Create a check via ***POST /check*** and provide the
    following (name, interval, timeout, url, path and port).
    **

## How it works?

after adding a check in the database the server will loop over all checks and send poll requests and save the result of each request in the database. these results will then be used when a user request a report via 
***GET /report/:name*** the report will have a name that matches the name of the check.
the user must own the check and hence can request a report with its name otherwise an 401 error is returned.

**

## **Improvements**
I have added the skeleton to send email notifications but couldn't get it to work properly in time, also i have added an extendable notification manager that facilitates adding different channels such as a webhook or slack.
