# awsdk-search

A search component for Danish address data to be used with Esri Web App Builder. It has been tested with beta 2 in random browsers.

## About the service
It is implemented as a dojo widget that calls webservices from the Ministry of Housing, Urban and Rural Affairs in Denmark [(MBBL)](http://mbbl.dk/). 

The documentation of the service is located at [aws.dk](http://www.aws.dk).

## Installation

### Semi-automatic installation
1. Download the zip file on this page and unpack it.
2. Open a command prompt and navigate to the awsdk-search-master folder
3. Run the createZip.py script by writing
```python createZip.py``` or ```C:\python27\ArcGIS10.2\python.exe createZip.py``` or something similar.
4. The file awsdk-install.zip is created. This file can be used to install the search component in the Web App Builder.
5. Extract the awsdk-install.zip in the root folder of the Web App Builder installation.
6. Start the Web App Builder.


### Manual installation
1. Copy folder awsdk-search to the widgets folder.
2. Add jquery and typeahead files to the libs folder and update stemapp/init.js
3. Update builder/predefined-apps/default2DApp/config.json
    Find this snippet: 
```    
    {
        "uri": "widgets/Geocoder/Widget",
        "position": {
            "left": 45,
            "top": 5
        }
    }
```

Add this snippet right after the Geocoder:

```    
    {
        "uri": "widgets/awsdk-search/Widget",
        "position": {
            "left": 45,
            "top": 5
        }
    }
```

