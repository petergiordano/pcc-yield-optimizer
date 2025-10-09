# Product Requirements Document: Demographic Map Overlay

## 1. Overview

This document outlines the requirements for a new feature: a demographic data overlay on the primary application map. The goal is to provide users with deeper contextual understanding of the areas surrounding points of interest by visualizing key demographic indicators like income, education, and population density.

## 2. Key Feature: Choropleth Map Overlay

The core of this feature will be a **choropleth map**. This is a thematic map where geographic areas (U.S. Census Tracts) are shaded or patterned in proportion to a statistical variable being displayed on the map, such as median household income or population density.

This overlay will be interactive and can be toggled on or off by the user, similar to the existing CTA transit layer.

## 3. Data Requirements

### 3.1. Data Sources

*   **Primary Source:** [U.S. Census Bureau's American Community Survey (ACS)](https://data.census.gov/). This is the authoritative source for detailed, annual demographic data in the United States.
*   **Secondary Source:** [City of Chicago Data Portal](https://data.cityofchicago.org/). This portal may offer pre-processed or supplementary local datasets.

### 3.2. Data Format

*   The final data format for rendering on the map must be **GeoJSON**. This is consistent with the existing data structures used for map layers in the project (e.g., `cta-lines-raw.geojson`).

## 4. Implementation Plan

The implementation will follow a four-stage process:

1.  **Data Acquisition and Processing:**
    *   Acquire geographic boundary files (TIGER/Line Shapefiles) for Census Tracts.
    *   Acquire the desired demographic data tables from the ACS.
    *   Join the demographic data to the geographic boundaries.
    *   Convert the final, combined dataset into a `demographics.geojson` file and place it in the `/data/geo/` directory.

2.  **Data Loading:**
    *   The application's data loading module (`js/data-loader.js`) will be updated to fetch the new `demographics.geojson` file upon map initialization.

3.  **Map Integration & Visualization:**
    *   The map component (`js/components/map.js`) will be modified to render the GeoJSON data as a new, toggleable layer.
    *   A color scale will be implemented to style the census tract polygons according to the selected demographic variable.

4.  **Interactivity and User Experience:**
    *   **Toggle Control:** A UI control will be added to allow users to show or hide the demographic overlay.
    *   **Tooltips:** On mouse hover, a tooltip will display the specific data for the highlighted census tract.
    *   **Legend:** A map legend will be created to explain the meaning of the colors used in the choropleth.
