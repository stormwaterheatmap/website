# Land Cover

*High-resolution Land Cover Development* 

## Overview

We produced a high spatial resolution 7-class land cover dataset of the
Puget Sound trough below 1,500 meters elevation using a hybrid of
automated classification and manual data overlays (Table 1). Here, the
Puget Sound trough is defined as the areas of Washington State which
drain into the Puget Sound or Straight of Juan de Fuca. This hybrid
approach allowed us to produce a highly accurate land cover dataset
appropriate for our stormwater modeling and using already available
resources (data, software, computation, and personnel). In Google Earth
Engine (Gorelick et al., 2017), we created a six-class 1-meter land
cover layer using the Naïve Bayes classifier (Google, 2019) and then
used overlay decision rules to combine that layer with a 10-m land cover
product from NOAA Coastal Change Analysis Program (C-CAP) (NOAA C-CAP,
2018a), water body and river polygons (Washington Department of Natural
Resources, 2015), shoreline polygons (Esri, 2006), over-water structure
polygons (Washington Department of Natural Resources, 2007), road
polygons buffered from lines (U.S. Census Bureau, 2016), and building
rooftops polygons (Microsoft, 2019). Lastly, we validated accuracy with
an observed land cover point dataset from the Washington Department of
Fish & Wildlife (Pierce, Jr., 2015).

Table 1. The number IDs and label names of the seven classes in the
final land cover dataset.

<table>
<center>
<thead>
<tr class="header">
<th><em>Class ID</em></th>
<th><em>Label Name</em></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>1</td>
<td>Fine Vegetation</td>
</tr>
<tr class="even">
<td>2</td>
<td>Medium Vegetation</td>
</tr>
<tr class="odd">
<td>3</td>
<td>Coarse Vegetation</td>
</tr>
<tr class="even">
<td>4</td>
<td>Dirt/Barren</td>
</tr>
<tr class="odd">
<td>5</td>
<td>Water</td>
</tr>
<tr class="even">
<td>6</td>
<td>Impervious Other</td>
</tr>
<tr class="odd">
<td>7</td>
<td>Impervious Roofs</td>
</tr>
</tbody>
</center>
</table>

## Land Cover Development

Our first step was to create a 1-meter resolution land cover layer of
the Puget Sound in Google Earth Engine using a Naïve Bayes classifier.
We trained the classifier using a subset of a 1-meter resolution land
cover dataset (NOAA C-CAP, 2018b) covering Snohomish County, Washington,
produced by NOAA C-CAP as a proof-of-concept. Through trial-and-error,
we decided upon and composited eleven bands from various sources into a
single dataset to be trained. We created the 1-meter Red, Green, Blue
and Near-infrared (NIR) reflectance bands by calculating the mean band
values from NAIP aerial imagery (U.S. Department of Agriculture, 2019)
collected over 2009 to 2019. The eleven composited bands included:

-   Texture: calculated from NAIP NIR band as entropy, or how expected a
    pixel value is in the context of nearby pixels, in this case using a
    radius of 12 meters. For more information, see
    <https://developers.google.com/earth-engine/image_texture>.
-   Land use: polygons (Washington State Department of Ecology, 2010)
    scaled to 1-meter.
-   Elevation: the USGS National Elevation Dataset (⅓ arc-second) (U.S.
    Geological Survey, 2015).
-   Hillshade: produced from the USGS National Elevation Dataset (⅓
    arc-second) (U.S. Geological Survey, 2015).
-   GNDVI: Green Normalized Difference Vegetation Index calculated with
    NAIP imagery as:
<div class="figure">
<center>
<img src="\img\NIRGreen.png" alt="NIR Green Equation" width="150"/>
</center>
</div>

-   MSAVI: Modified Soil Adjusted Vegetation Index calculated with NAIP
    imagery as:
<div class="figure">
<center>
<img src="\img\NIRRed.JPG" alt="NIR Red Equation" width="500"/>
</center>
</div>
-   Binary MSAVI: a Boolean selection of MSAVI where:
<div class="figure">
<center>
<img src="\img\MSAVI.png" alt="MSAVI Equation" width="400"/>
</center>
</div>

-   Green: Green NAIP band.
-   Blue: Blue NAIP band.
-   Red: Red NAIP band.
-   NIR: NIR NAIP band.

The Naïve Bayes classification result was then smoothed with a dilation
process (2-meter focal maximum analysis followed by a 2-m focal minimum
analysis). The quality of this product varied among the classes.
Vegetated and impervious areas mapped well, but dirt/barren and water
were inconsistent and often mistaken for each other or for impervious.

To improve the labels in those inconsistent locations, we used a
decision rule and replacement approach using NOAA`s 10-meter CCAP land
cover dataset (NOAA C-CAP, 2018a), which covers western Washington
including the Puget Sound. While this dataset tested high in accuracy
already, 10-meters is not an adequate spatial resolution to inform many
site-level analyses used in our subsequent stormwater modeling,
particularly in highly urbanized areas where vegetation is present but
dispersed. However, the CCAP product does well to capture land cover
existing at large, continuous extents throughout the landscape, such as
forests, vegetated fields, broad sandy beaches, waterbodies, and large
parking lots. Recognizing this, we chose to substitute pixels of certain
classes from the 1-m classification with the 10-m CCAP. We also used the
CCAP water and dirt classes to help clean up shoreline areas using a
10-m focal maximum algorithm to grow the class landward. The decision
and replacement approach is as follows for each 1-m pixel, where label
ID numbers are listed in Table 1 above.

**Classification Psuedocode**

 **IF** `Rooftop`:  
    `label = 7`  
 **ELSE IF** `Dirt Road`:  
    `label =  4`  
 **ELSE IF** `Road` **OR** `Over-Water Structure`:  
   `label =  6`  
 **ELSE IF** `Inland waterbody` or `County shoreline`:  
   `label = 5`  
 **ELSE IF**`1-m Naïve Bayes label` in
`(Fine vegetation, Medium vegetation, Coarse vegetation)`:  
 `label =  (1, 2, 3)` respectively  
 **ELSE IF**`1-m Naïve Bayes` label = `10-m C-CAP label`:  
   `label = C-CAP label`  
 **ELSE IF** 10-m radius focal max of `10-m C-CAP` in `(4, 5)`:  
  `label = (4,5)` respectively  
 **ELSE IF** `1-m Naïve Bayes` = `Dirt/Barren`:  
   replace with `10-m C-CAP`  
 **ELSE**  
  `10-m C-CAP`

Our final step with the land cover creation was to limit the data to
areas below 1,500-meters elevation to exclude permanent ice,
e.g. glaciers on Mt. Rainier, which was not classified or necessary for
our stormwater model.

## Validation and Accuracy Assessment

We validated the predicted land cover dataset in Earth Engine by
producing confusion matrices and testing accuracy and kappa statistics.
Here, the accuracy test is simply calculated as the number of
ground-truthed sample points which correctly match the predicted pixel
label divided by the total number of sample points used. We also
calculated a kappa statistic, which is generally thought to be a more
reliable test as it accounts for chance agreement of the observed and
predicted labels. For both tests, zero (0) is lowest accuracy and 1 is
highest.

We produced our ground-truth dataset of 34,699 points using a dataset of
points and polygons provided by WDFW (Pierce, Jr., 2015). The original
points data consisted of 44,882 randomly distributed locations across
the Puget Sound which were assigned class names through visual
inspection of 2013 NAIP imagery for the purpose of ground-truthing land
cover data. The polygons data represent land cover in 2015 and were
developed with a segmentation and decision tree approach. We prepared
the validation points data with the following process:

**Data preparation:**

1.  Subset the points by filtering out unlabeled points, points located
    outside our classification area (e.g. marine water), and points with
    labels that did not match labels of 2015 land cover polygons. This
    filtering retained 34,699 of the original 44,882 points.

2.  Relabel names to six classes:

    1.  `FinalFineVegetation` & `FinalFineVegetation` →         
        `Fine Vegetation`
    2.  `FinalMedium` → `Medium Vegetation`
    3.  `FinalCoarseVegetation` → `Coarse Vegetation`
    4.  `FinalDirt` → `Barren/Dirt`
    5.  `FinalWaterFinalWater` → `Water`
    6.  `BuiltConflict` & `FinalBuilt` & `FinalBuiltBrownRed` →
        `Impervious Developed`

3.  In Earth Engine, remap the point labels to produce a second set of
    point features labeled Pervious and Impervious to also validate the
    dataset for its ability to map impervious surface.

4.  We randomly selected 3,000 points to use from each of the six
    classes in the ground-truthed points data to reduce bias towards one
    or more classes.

5.  At this point, the two datasets were ready for analysis. We refer to
    them respectively as: Ground-truthed Land Cover and Ground-truthed
    Impervious Surface.

Using those ground-truth points and our seven-class land cover product,
we calculated accuracy and kappa statistics for three derivative
products of the seven-class land cover dataset: Impervious, Six-class,
and Four-class (Table 2).

-   The **Impervious** derivative is a binary dataset where impervious
    includes rooftops, roads, and other features that force water to run
    off rather than percolate through the surface. These are labeled
    referred to as “Built” within the ground-truth points data. We
    remapped the “Impervious Roofs” and “Impervious Other” to the
    Impervious class, and all other classes were considered
    “Non-impervious.”
-   The **Six-class** derivative includes all classes, but the two
    impervious classes are remapped to one single Impervious class.
    These classes are equivalent to the six classes labeled in the
    ground-truthed points data and the NOAA 10-m Puget Sound land cover
    dataset.
-   The **Four-class** derivative includes only the Fine Vegetation,
    Coarse Vegetation, Water, and Impervious (Built) classes.

<table>
<caption>
Table 2.1. Accuracy and kappa statistics for three derivatives of the seven-class
land cover product.
</caption>
<thead>

<tr>
<th></th>
<th colspan="2">Impervious</th>
<th colspan="2">Six Classes</th>
<th colspan="2">Four Classes</th>
</tr>

<tr>
<th>County</th>
<th>Accuracy</th>
<th>Kappa</th>
<th>Accuracy</th>
<th>Kappa</th>
<th>Accuracy</th>
<th>Kappa</th>
</tr>
</thead>

<tbody>
<tr>
<td>Clallam</td>
<td>0.985</td>
<td>0.947</td>
<td>0.702</td>
<td>0.631</td>
<td>0.915</td>
<td>0.885</td>
</tr>
<tr>
<td>Island</td>
<td>0.987</td>
<td>0.942</td>
<td>0.537</td>
<td>0.447</td>
<td>0.912</td>
<td>0.877</td>
</tr>
<tr>
<td>Jefferson</td>
<td>0.977</td>
<td>0.931</td>
<td>0.698</td>
<td>0.629</td>
<td>0.911</td>
<td>0.880</td>
</tr>
<tr>
<td>King</td>
<td>0.971</td>
<td>0.898</td>
<td>0.635</td>
<td>0.567</td>
<td>0.929</td>
<td>0.904</td>
</tr>
<tr>
<td>Kitsap</td>
<td>0.976</td>
<td>0.923</td>
<td>0.725</td>
<td>0.655</td>
<td>0.946</td>
<td>0.926</td>
</tr>
<tr>
<td>Lewis</td>
<td>1.000</td>
<td>1.000</td>
<td>0.612</td>
<td>0.443</td>
<td>0.964</td>
<td>0.934</td>
</tr>
<tr>
<td>Mason</td>
<td>0.977</td>
<td>0.919</td>
<td>0.686</td>
<td>0.612</td>
<td>0.926</td>
<td>0.897</td>
</tr>
<tr>
<td>Pierce</td>
<td>0.973</td>
<td>0.912</td>
<td>0.626</td>
<td>0.548</td>
<td>0.888</td>
<td>0.848</td>
</tr>
<tr>
<td>San Juan</td>
<td>0.976</td>
<td>0.899</td>
<td>0.591</td>
<td>0.511</td>
<td>0.829</td>
<td>0.771</td>
</tr>
<tr>
<td>Skagit</td>
<td>0.983</td>
<td>0.926</td>
<td>0.655</td>
<td>0.585</td>
<td>0.911</td>
<td>0.880</td>
</tr>
<tr>
<td>Snohomish</td>
<td>0.958</td>
<td>0.860</td>
<td>0.646</td>
<td>0.581</td>
<td>0.926</td>
<td>0.901</td>
</tr>
<tr>
<td>Thurston</td>
<td>0.975</td>
<td>0.919</td>
<td>0.641</td>
<td>0.573</td>
<td>0.906</td>
<td>0.875</td>
</tr>
<tr>
<td>Whatcom</td>
<td>0.987</td>
<td>0.944</td>
<td>0.637</td>
<td>0.566</td>
<td>0.869</td>
<td>0.823</td>
</tr>
</tbody>
</table>

While the Impervious and Four-class derivatives test extremely well with
both Accuracy and Kappa statistics, the Six-class derivative tests
considerably lower. The Error (Confusion) matrices produced with the
Six-class derivative dataset indicate that the Medium Vegetation and
Dirt/Barren classes do not match well between our land cover product and
the ground-truth points. Inspection of those matrices tells us that the
Medium Vegetation ground-truth points were often labeled Fine or Coarse
Vegetation in our predicted set. Similarly, the Dirt ground-truth points
were often labeled Built or Fine Vegetation.

Some of the discrepancies likely occur because vegetation green-up
(particularly in fine vegetation such as grass) can occur differently
from year to year and cause mislabeling when comparing data from
different periods. Where grass is green in one year’s input imagery, it
may appear as dirt or barren in another year’s imagery if captured
during a particularly dry period. These issues may result from error in
the land cover labeling, ground-truth labeling, or actual changes in
land cover that occurred between the input data dates (i.e. 2013 to
2017). Furthermore, dirt is often mistaken for impervious surfaces (and
vice versa) because those surfaces are often built with dirt and stone,
thus creating similar spectral reflectance.

Overall, we find the discrepancies to be low concern for the purpose of
our stormwater modeling. The horizontal area of the Medium Vegetation
and the Dirt/Barren classes in our land cover data is considerably
smaller than the other classes, and their respective labeling
discrepancies are to classes that are treated similarly to each of them
respectively in the stormwater hydrology modeling (e.g. Medium
Vegetation is subsequently remapped to Coarse Vegetation).