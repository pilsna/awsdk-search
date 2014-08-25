define([
        'dojo/_base/declare',
        'esri/geometry/Extent',
        'jimu/BaseWidget',
        './js/aws-search',
        'esri/geometry/Point',
        'esri/layers/GraphicsLayer',
        'esri/graphic',
        'dojo/dom-construct',
        'esri/InfoTemplate',
        'esri/dijit/Popup',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color'
    ],
    function(declare, Extent, BaseWidget, Search, Point, GraphicsLayer, Graphic, domConstruct, InfoTemplate, Popup, SimpleFillSymbol, SimpleLineSymbol, Color) {

        return declare([BaseWidget], {
            //please note that this property is be set by the framework when widget is loaded.
            //templateString: template,

            baseClass: 'jimu-widget-awssearch',

            name: 'awsdk-search',

            postCreate: function() {
                this.inherited(arguments);
                console.log('postCreate');
            },

            startup: function() {

                this.inherited(arguments);

                var map = this.map;
                var setExtent = function(object) {
                    var extent = new Extent(object);
                    map.setExtent(extent, true);
                    console.log('zoomlevel: ' + map.getZoom());
                }
                var popupTitle = this.config.popupTitle;
                var zoomTo = function(point) {
                    map.infoWindow.setContent(point.text);
                    map.infoWindow.setTitle(popupTitle);
                    map.infoWindow.show(point);
                    map.centerAndZoom(point, 17);
                }
                console.log('loading the search plugin....');
                var s = new Search();
                s.create('.typeahead', setExtent, zoomTo);
                console.log('startup');
            },

            onOpen: function() {
                console.log('onOpen');
            },

            onClose: function() {
                console.log('onClose');
            },

            onMinimize: function() {
                console.log('onMinimize');
            },

            onMaximize: function() {
                console.log('onMaximize');
            },

            onSignIn: function(credential) {
                /* jshint unused:false*/
                console.log('onSignIn');
            },

            onSignOut: function() {
                console.log('onSignOut');
            }
        });
    });
