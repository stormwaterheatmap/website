Land Use
================

*Department of Commerce Master Land Use Category*

## Description

The Puget Sound Mapping Project provides land-use designations of the
urban areas that drain into Puget Sound. Data is derived from zoning and
land-use data from 113 cities in 12 counties. A description of land use
categories, provided by Commerce is below.

**Intensive Urban**

Intensive Urban areas include the sub-categories of Commercial/Office;
Mixed Use; Residential (12+ Units/Acre) and Institutional Uses. The
locations may contain development such as office buildings, retail
stores, apartments, civic buildings, hospitals or institutions of higher
learning. Generally, impervious surface coverage (buildings, pavement)
exceeds 50 percent. PUBLIC Public use areas may have a mixture of
intensively and sparsely developed locations that apply to a range of
civic oriented places such as parks, schools, reservoirs, libraries and
stadiums.

**Industrial**

The Industrial category includes Airport/Seaport; Light Industrial; and
Heavy Industrial subcategories. These locations not only have
manufacturing facilities but may also include warehousing, repair shops
and major transportation facilities.

**Urban Character Residential**

Urban Character Residential includes the Traditional Single Family
Neighborhood designation, as well as locations within the Mixed
Use/Planned Neighborhood and Low Density Urban (1.1 Unit/Acre to 3
Units/Acre) sub-categories. Detached homes predominate in these
locations but may be interspersed with duplexes, parks, churches and
schools. Lot sizes in these areas are over 3,600 square feet per unit
but less than 1 acre. Some areas may have small neighborhood commercial
stores or areas of apartments but these do not compose a significant
amount of development and the overall density stays below 12 units/acre.

**Rural Character Residential**

The Rural Character Residential category covers areas where lot size
ranges from 1 acre to over 20 acres. This includes areas that are purely
residential as well as areas that contain agriculture, timber and other
rural uses intermixed among homes. These locations include the
sub-categories of Urban Edge, Rural Transition, Large Lot Residential
and Very Large Lot Residential.

**Mining**

These locations may or may not be designated as mineral resource areas
under the state’s Growth Management Act. They are often open pit
operations (like gravel pits and quarries) for construction materials
and aggregate. See
<http://www.commerce.wa.gov/serving-communities/growth-management/growthmanagement-topics/natural-resource-lands/>

**Forest Lands**

Forest lands include areas located within National Forest as well as
locations that are privately held and intended for timber production.
They may include some other land uses such as recreational areas and
vacation homes. Subcategories include National Forest, Primary Forest
Area and Other Forest Lands. See
<http://www.commerce.wa.gov/servingcommunities/growth-management/growth-management-topics/natural-resource-lands/>

**Agricultural Areas**

Agricultural areas include places specifically designated for
agriculture as well as areas where agriculture is a significant (but not
necessarily predominant) use. Agricultural uses include farms, ranches
and dairies. Hobby farms and equestrian lots may also have a significant
presence in these areas. Primary Agricultural Areas and Other Active
Agriculture are the sub-categories contained within this master
designation. See
<http://www.commerce.wa.gov/serving-communities/growth-management/growthmanagement-topics/natural-resource-lands/>

**Active Open Space**

Campgrounds, resort developments, large parks and open spaces with
extensive trail systems typify locations with this type of zoning.

**Natural Open Space**

The three national parks (Olympic, Mt. Rainier and North Cascades)
correspond with the National Park sub-category. Other areas within this
master category are a part of the Natural Preservation and Open Space
sub-category where the intent is the preservation of watersheds,
habitat, vegetation and other natural features.

**Tribal**

The Tribal category includes locations within tribal reservations
(Tribal Reservation) as well as land outside of the reservations
controlled by tribal entities (Tribal Inholding Lands).

**Military**

The Intensively Developed Military sub-category includes locations where
the Naval, Army, Air Force, Marine and Coast Guard facilities have
buildings, piers, airports or other similar active uses are included
within this designation. Less developed portions of military reserves
are included within the Undeveloped Military Lands sub-category.

**ROW**

Formally designated rights-of-way by jurisdictions are included in this
designation. This may include roads, railroads or power transmission
corridors. Locations identified by the Washington State Department of
Transportation as a part of the state’s road network are incorporated as
60-foot wide rights-of-way from the centerline of the road. *This
category includes areas designated as PROW (preliminarily identified
ROW)*

**Water**

Tidal bodies, lakes, ponds, streams and rivers are consolidated within
the Water designation. Some water features may not have been included in
source material and inadvertently omitted from these locations.

**Undesignated**

Undesignated Zoning and existing land use cannot be positively
identified for these locations. This occurs in places for which
jurisdictions have not created zoning designations. In addition,
overlaps or gaps in maps along the boundary between jurisdictions may
inhibit the ability to categorize these areas

## Layer Access in Earth Engine

The javascript commands below can be used to access this layer within
the [Google Earth Engine Code
Editor](https://developers.google.com/earth-engine/guides/playground). A
Google Earth Engine account is required.

``` javascript
// Import the layer data dictionary
var data = require('users/stormwaterheatmap/apps:data/public')

// To view data dictionary, print to the console:
print('Data:', data)

//Get this layer from the layer data dictionary: 
var layer_name = data.rasters["Land Use"]
```

#### Viewing

Individual objects contain all the info used in the stormwater heatmap.
To add it to the map, add the layer object.

``` javascript
var display_image = layer_name.layer
Map.addLayer(display_image)
```

#### Analysis

To get the raw image data for analysis, access the `eeObject` key.

``` javascript
var raw_image = layer_name.layer.eeObject
Map.addLayer(raw_image,{},'Land Use')
```

## Layer Full-Extent Download

Click the "download" link to initiate the download process. The data will download as a GeoTIFF file (the file size is listed beside the layer name) and a WGS 84 projection. The resolution is the finest available based on the source data.

Land Use (279.2MB) [download](https://storage.googleapis.com/live_data_layers/rasters/Land_Use.tif)

## Visualization

### Palette

| Label                            | Raster value | Colors                                                                    |
|:---------------------------------|:-------------|:--------------------------------------------------------------------------|
| Undesignated                     | 0            | ![\#394B59](https://via.placeholder.com/15/394B59/000000?text=+)`#394B59` |
| Agricultural                     | 1            | ![\#669C42](https://via.placeholder.com/15/669C42/000000?text=+)`#669C42` |
| Tribal                           | 2            | ![\#EFD09E](https://via.placeholder.com/15/EFD09E/000000?text=+)`#EFD09E` |
| Forest Lands                     | 3            | ![\#14774C](https://via.placeholder.com/15/14774C/000000?text=+)`#14774C` |
| Intensive Urban                  | 4            | ![\#9E2B0E](https://via.placeholder.com/15/9E2B0E/000000?text=+)`#9E2B0E` |
| Rural Character Residential      | 5            | ![\#F4A691](https://via.placeholder.com/15/F4A691/000000?text=+)`#F4A691` |
| Water                            | 6            | ![\#2778AC](https://via.placeholder.com/15/2778AC/000000?text=+)`#2778AC` |
| Right of Way                     | 7            | ![\#6E8387](https://via.placeholder.com/15/6E8387/000000?text=+)`#6E8387` |
| Active Open Space and Recreation | 8            | ![\#8EB8B3](https://via.placeholder.com/15/8EB8B3/000000?text=+)`#8EB8B3` |
| Urban Character Residential      | 9            | ![\#D17257](https://via.placeholder.com/15/D17257/000000?text=+)`#D17257` |
| Industrial                       | 10           | ![\#7C497B](https://via.placeholder.com/15/7C497B/000000?text=+)`#7C497B` |
| Public                           | 11           | ![\#554180](https://via.placeholder.com/15/554180/000000?text=+)`#554180` |
| Natural Preservation             | 12           | ![\#66CDAB](https://via.placeholder.com/15/66CDAB/000000?text=+)`#66CDAB` |
| Military                         | 13           | ![\#9FABA2](https://via.placeholder.com/15/9FABA2/000000?text=+)`#9FABA2` |
| Mineral Resource Area            | 14           | ![\#BF93BE](https://via.placeholder.com/15/BF93BE/000000?text=+)`#BF93BE` |

## Source

Puget Sound Mapping Project

## External Links

<a>https://www.commerce.wa.gov/serving-communities/growth-management/puget-sound-mapping-project/</a>
