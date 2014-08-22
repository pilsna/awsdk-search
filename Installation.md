## Installation
1. Copy folder awsdk - search to the widgets folder
2. Update stemapp/init.js, add jquery and typeahead files.
3. Update builder/predefined-apps/default2DApp/config.json
    Delete this part: 
    {
        "uri": "widgets/Geocoder/Widget",
        "position": {
            "left": 45,
            "top": 5
        }
    },
    And add this instead: 
    {
        "uri": "widgets/awsdk-search/Widget",
        "position": {
            "left": 45,
            "top": 5
        }
    },


