define([
        'dojo/_base/declare',
        'esri/geometry/Extent',
        'jimu/BaseWidget',
        './js/aws-search'
    ],
    function(declare, Extent, BaseWidget, Search) {

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

                var popupTitle = this.config.popupTitle;
                var zoomTo = function(point) {
                    map.infoWindow.setContent(point.text);
                    map.infoWindow.setTitle(popupTitle);
                    map.infoWindow.show(point);
                    map.centerAndZoom(point, 17);
                }
                console.log('loading the search plugin....');
                var s = new Search();
                s.create('.typeahead', zoomTo, map);
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
