# Instructions: Acquiring and Processing Census Data for Demographic Overlay

This guide provides step-by-step instructions for obtaining the necessary geographic and demographic data from the U.S. Census Bureau and preparing it for use in the application.

The goal is to create a single `demographics.geojson` file that contains Census Tract polygons for Cook County, Illinois, enriched with median household income data.

### Recommended Tools

*   **QGIS (Recommended for UI-based approach):** A free and open-source Geographic Information System. It can handle data joining and conversion easily.
*   **GDAL (`ogr2ogr` command-line tool):** For users comfortable with the command line.
*   **Python with `geopandas`:** For a programmatic approach.

---

### Step 1: Download the Geographic Boundaries (Shapefile)

1.  Navigate to the [Census Bureau's TIGER/Line Shapefiles page](https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html).
2.  Use the dropdowns or page navigation to find the **2023** TIGER/Line Shapefiles.
3.  Select **"Census Tracts"** as the layer type.
4.  Click **Submit**.
5.  On the next page, select **"Illinois"** and click **Download**.
6.  This will download a zip file (`tl_2023_17_tract.zip`). Unzip it. Inside, you will find the shapefile components. You are interested in the data for Cook County, which has a FIPS code of `031`.

### Step 2: Download the Demographic Data (ACS Table)

1.  Go to the U.S. Census data explorer: [data.census.gov](https://data.census.gov/).
2.  In the main search bar, enter the table ID for Median Household Income: **`B19013`**.
3.  Click the "Filters" button to define your geography.
    *   Filter by **Geography**: `Census Tract` -> `Illinois` -> `Cook County, Illinois`. Select all census tracts within Cook County.
4.  You should now see a table of median household income for all census tracts in Cook County.
5.  Download this table. Choose the CSV format for ease of use. The downloaded file will have a name like `ACSDT5Y2022.B19013-Data.csv`.

### Step 3: Join the Data and Convert to GeoJSON

This step involves linking the income data from the CSV to the map polygons from the shapefile.

The key is the **`GEOID`** column, which exists in both datasets and uniquely identifies each census tract.

#### Using QGIS (Recommended)

1.  **Load Layers:**
    *   Open QGIS.
    *   Add the shapefile (`tl_2023_17_tract.shp`) as a vector layer.
    *   Add the downloaded ACS CSV file as a delimited text layer.
2.  **Filter by County:**
    *   Right-click the `tl_2023_17_tract` layer, go to `Filter`, and set the filter to `"COUNTYFP" = '031'` to show only Cook County.
3.  **Join the Layers:**
    *   Go to the properties of the shapefile layer.
    *   Find the "Joins" tab.
    *   Click the "+" icon to add a new join.
    *   **Join Layer:** The ACS CSV file.
    *   **Join Field:** `GEOID`.
    *   **Target Field:** `GEOID`.
    *   Confirm the join. The attributes of your shapefile layer now include the income data.
4.  **Export as GeoJSON:**
    *   Right-click the joined layer and select `Export` -> `Save Features As...`.
    *   **Format:** `GeoJSON`.
    *   **File name:** `demographics.geojson`.
    *   **CRS (Coordinate Reference System):** Ensure it is set to `EPSG:4326 - WGS 84`. This is the standard for web mapping.
    *   Save the file.

### Final Step: Place the File

Move the newly created `demographics.geojson` file into the `/data/geo/` directory of the project. It is now ready to be loaded by the application.
