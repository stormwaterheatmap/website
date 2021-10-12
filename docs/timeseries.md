---
id: timeseries
title: Time Series Data
# sidebar_location: 2
---

## How to download time series data

Tabulated hydrology results are available via <a href="https://cloud.google.com/bigquery">Google BigQuery</a>, a cloud-based relational database that includes a distributed SQL engine. The data are located on the ```tnc-data-v1``` <a href="https://console.cloud.google.com/bigquery?project=tnc-data-v1">data bucket</a> (sign-in required). The table is named ```tnc-data-v1:hydrology.gfdl```. BigQuery supports several client libraries. See https://cloud.google.com/bigquery/docs/reference/libraries for a list of supported clients libraries.

Using R, the tnc-data-v1 databucket can be accessed through a database connection using the DBI package:

### Schema
The table schema are shown in Table B.1.

<table class="tg">
<caption> Table B.1. BigQuery Table Schema for tnc-data-v1:hydrology.gfdl</caption>
<thead>
  <tr>
    <th> Fieldname </th>
    <th> Type </th>
    <th> Description </th>
  </tr>
</thead>
<tbody>
  <tr>
   <td>grid</td>
   <td>STRING</td>
   <td>WRF Grid ID Number</td>
   </tr>
  <tr>
   <td>year</td>
   <td>INTEGER</td>
   <td>Year of Simulation</td>
   </tr>
    <tr>
   <td>month</td>
   <td>INTEGER</td>
   <td>Month of Simulation</td>
   </tr>
    <tr>
   <td>comp</td>
   <td>STRING</td>
   <td>HSPF Runoff component (AGWO, IFWO, SURO)</td>
   </tr>
    <tr>
   <td>hru000 … hru252</td>
   <td>STRING</td>
   <td>Runoff (mm) (one column for each HRU)</td>
   </tr>
    <tr>
   <td>Datetime</td>
   <td>TIMESTAMP</td>
   <td>Simulation Hour (UTC)</td>
   </tr>
    <tr>
   <td>simulation_day</td>
   <td>	INTEGER</td>
   <td>	Day of simulation (01-Jan-1970 = Day 1)</td>
   </tr>
</tbody>
</table>

### Querying Tabulated Results
The data may be queried through Google Cloud Platform directly, or through a number of available software libraries. Queries are performed through standard SQL language. Some example queries are provided below.

Get all surface flow components from the SeaTac precipitation grid (ID16_V7) for the years 1970-1999:

```
SELECT
  *
FROM
  `tnc-data-v1.hydrology.gfdl`
WHERE
  grid = "ID16_V7"
  AND comp IN ('suro',
    'ifwo')
  AND year BETWEEN 1970
  AND 1999
  ``` 

  Get the annual peak flow for surface flow components from the SeaTac precipitation grid (ID16_V7) for the years 1970-1999:

```
SELECT
  max(hru250) as peakQ, Year, 
FROM
  `tnc-data-v1.hydrology.gfdl`
WHERE
  grid = "ID16_V7"
  AND comp IN ('suro',
    'ifwo')
  AND year BETWEEN 1970
  AND 1999
 Group by Year
 ```

 ### Querying Geometry

Google BigQuery supports PostGIS geometry functions (see https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions for instructions).

Grid geometries are available from the ```tnc-data-v1.gfdl.geometry``` table on Big Query. The table schema is as follows:

<table class="tg">
<thead>
  <tr>
    <th> Fieldname </th>
    <th> Type </th>
    <th> Description </th>
  </tr>
</thead>
<tbody>
  <tr>
   <td>grid</td>
   <td>STRING</td>
   <td>WRF Grid ID Number</td>
   </tr>
  <tr>
   <td>xy</td>
   <td>GEOGRAPHY</td>
   <td>Centroid of the grid (PostGIS point)</td>
   </tr>
    <tr>
   <td>geohash</td>
   <td>STRING</td>
   <td>PostGIS geohash string approximating grid boundary</td>
   </tr>
    <tr>
   <td>geometry</td>
   <td>STRING</td>
   <td>Well known text format of the grid boundary</td>
   </tr>
</tbody>
</table>

An example query to return the Grid ID covering the Seattle Center:
```
WITH
  SeattleCenter AS (
  SELECT
    ST_geogpoint(-122.35,
      47.62) AS location)
SELECT
  grid
FROM
  `tnc-data-v1.gfdl.geometry`
WHERE
  ST_DWITHIN(ST_GEOGFROMTEXT(geometry),
    (
    SELECT
      location
    FROM
      SeattleCenter),
    0)
```
Returns the grid ID pertaining to this location:
Row|grid 1|ID16_V9