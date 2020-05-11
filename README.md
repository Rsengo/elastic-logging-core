## Library
The library is designed to simplify sending logs from front-end applications to elasticsearch for further visualization, for example, using Kibana

### !The library is under development!

## Motivation
In the process of testing applications, errors often arise that are difficult to replicate. This type of error also includes “floating bugs” that occur with some periodicity under strictly defined conditions. To simplify the process of finding and eliminating such errors, it is better to know where they occur, in which parts of the code and under what conditions.

To track actions that lead to errors, various logging systems are used, which allows you to store user actions and errors that occur along with time stamps in one place. When developing the back-end, there are many ways to organize the storage of logs: files, records in the DBMS, etc. When developing a front-end, developers cannot afford to use these concepts, so we need a fundamentally new way.

To implement such a system when developing the front-end, the logical way is to use a logging system that can receive data using some kind of Web API. Also, the best solution is to store all the logs in one place, which will reduce the number of systems used by different applications, and, accordingly, the time to support them. Based on this, we get the main idea - storing centralized logs of the front-end parts of the application that can be created using the Web API (for example, REST).

## Approaches to solving the problem
To solve this problem, there are many specialized systems:
Sentry
Rollbar
Raygun
Airbrake
Bugsnag
Tracejs
...
All systems have excellent support, we recommend that you familiarize yourself with them. However, for small projects, their cost may be a negative factor.

## Alternative approach
As an alternative, you can use the bundle that is often used when monitoring backend services - ELK-stack. This system is a bunch of 3x (often 4x) components:

1. Elasticsearch. Search system. It is a NoSQL DBMS with a powerful search engine. Allows you to record using the REST API.
2. Kibana. Visualization system. Used to visualize data from various sources, including Elasticsearch.
3. Logstash. The system used to collect and analyze logs, convert them and send them to Elasticsearch.
4. Filebeat (Optional). Used to collect logs from various sources and send them to Logstash.

In the case of developing front-end applications, you can exclude the last two points from this bundle and leave only Elasticsearch and Kibana. Logs are sent directly to Elasticsearch and rendered using Kibana.

## Setting up Elasicsearch and Kibana
Applications can be deployed using docker images. The only configuration you need to do is add CORS support to Elasticsearch. Because the system is centralized, logs must be received from different places, therefore cross-domain requests take place. To do this, add the following lines to the config:

http.cors.allow-origin:"*"
http.cors.enabled:true
http.cors.allow-credentials:true
http.cors.allow-methods:OPTIONS, GET, HEAD, POST, PUT, DELETE
http.cors.allow-headers:X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization, Access-Control-Allow-Headers, Accept

## The goal of this library
The package provides a logger, enum with logging levels and an error that is thrown exclusively by the logger (to prevent cyclic processing and logging when writing error hooks).
The logger object is configured using the config object. This object contains the following properties:

1. * application *. Used to configure the index of records in Elasticsearch. All entries in the application will be created under this index and type "frontend-application".
2. * url (example: https: // localhost: 9200) *. Used to configure the Elasticsearch address.
3. * timeout * (optional, default = 5000). Used to configure the response timeout from the service.
4. * deprecated * (optional, default = false). Must be set when using elasticsearch <6

After configuration, you can use the methods of this instance inside the application.

## Customization of visualization in Kibana
1. Send a test log to Elasticsearch
2. Open settings → index management → create index
[![CreateIndex](https://raw.githubusercontent.com/Rsengo/js-elastic-logging/master/screenshots/CreateIndex.png "CreateIndex")](https://raw.githubusercontent.com/Rsengo/js-elastic-logging/master/screenshots/CreateIndex.png "CreateIndex")
3. Go to the visualization section. Logs for the application will be displayed here.
[![Visualization](https://raw.githubusercontent.com/Rsengo/js-elastic-logging/master/screenshots/LogsVisualization.png "Visualization")](https://raw.githubusercontent.com/Rsengo/js-elastic-logging/master/screenshots/LogsVisualization.png "Visualization")

## Solution to possible problems
- I can not create an Index Pattern in Kibana, because my index is not listed.

Try to log at least one message, the index should be created by itself if the server accepted your request. The error when sending the log can be tracked in the developer's console in the browser. A request to http: // <your-elastic-host>: <elastic-port> / _bulk should return a 200 response code.

- Index Pattern in Kibana is created indefinitely.

Try sending the following queries:
curl -X PUT *yout-elastic-host:your-elastic-port*/_all/_settings -d '{"index.blocks.read_only_allow_delete": null}'

curl -X PUT *yout-elastic-host:your-elastic-port*/_cluster/settings -d '{"transient": {"cluster.routing.allocation.disk.threshold_enabled": false}
