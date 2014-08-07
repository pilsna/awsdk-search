define(['dojo/_base/declare',
        "esri/geometry/Extent",
        'jimu/BaseWidget',
        './js/jquery.min',
        './widgets/AwsSearch/js/aws-search.js'
    ],
    function(declare, Extent, BaseWidget, jQuery, search) {

        return declare([BaseWidget], {
            //please note that this property is be set by the framework when widget is loaded.
            //templateString: template,

            baseClass: 'jimu-widget-awssearch',

            name: 'AwsSearch',

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
                var zoomTo = function(point) {
                    map.centerAndZoom(point, 17);
                }
                console.log('loading the search plugin....');
                $(document).ready(function(){
                    var s = search.create('.typeahead', setExtent, zoomTo); 
                });
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
