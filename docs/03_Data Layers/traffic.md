Traffic
================

*Mean Annual Average Daily Trips*

## Description

Historic traffic data was provided by INRIX for the Puget Sound Region.

INRIX derives historical flow data using the following:

-   Traffic sensors – Sensors put in place by local DOTs or private
    sector companies, from which traffic speed is either reported or can
    be inferred. The sensors utilize one of several types of technology:
    -   Induction loop sensors imbedded in the roadway,
    -   Radar sensors, and/or
    -   Toll tag readers along stretches of roadway
-   Probe vehicles – The INRIX network includes hundreds of thousands of
    probe vehicles—trucks, taxis, buses, and passenger cars with onboard
    GPS devices and transmitting capability—to relay speed and location
    back to a main location. INRIX has agreements with several fleets to
    obtain the speed and location data anonymously.
-   INRIX Smart Dust Network – This network works by combining real-time
    GPS probe data from more than 650,000 commercial vehicles across the
    U.S. that travel on a specific segment of road during a particular
    time window, physical sensor information, and other real-time
    traffic flow information with hundreds of market-specific criteria
    that affect traffic—such as construction and road closures,
    real-time incidents, sporting and entertainment events, weather
    forecasts, and school schedules. This component gathers all input
    points, weights them appropriately based on input quality and
    latency, and calculates the speed occurring on that road segment to
    a measured degree of accuracy.

Traffic Volume point data was aggregated by TIGER Roadway lines.

## Layer Access

### Earth Engine

To use this layer in Google Earth Engine, import the stormwaterheatmap
public data library:

    var data  = require('users/stormwaterheatmap/apps:data/public')
    layer = data.rasters["Traffic"]

## Visualization

### Palette

| Raster value | Colors                                                                    |
|:-------------|:--------------------------------------------------------------------------|
| NA           | ![\#000004](https://via.placeholder.com/15/000004/000000?text=+)`#000004` |
| NA           | ![\#320A5A](https://via.placeholder.com/15/320A5A/000000?text=+)`#320A5A` |
| NA           | ![\#781B6C](https://via.placeholder.com/15/781B6C/000000?text=+)`#781B6C` |
| NA           | ![\#BB3654](https://via.placeholder.com/15/BB3654/000000?text=+)`#BB3654` |
| NA           | ![\#EC6824](https://via.placeholder.com/15/EC6824/000000?text=+)`#EC6824` |
| NA           | ![\#FBB41A](https://via.placeholder.com/15/FBB41A/000000?text=+)`#FBB41A` |
| NA           | ![\#FCFFA4](https://via.placeholder.com/15/FCFFA4/000000?text=+)`#FCFFA4` |

### Color Ramp

<img src="C:/Users/CNilsen/Documents/repos/heatmap_earthengine/layer_docs/traffic_files/figure-gfm/unnamed-chunk-9-1.png" width="340" />

**Minimum:** 0 Average Annual Daily Trips (log)

**Maximum:** 8 Average Annual Daily Trips (log)

## Source

The Nature Conservancy

## External Links
