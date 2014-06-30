define(['dojo/_base/declare',
        "esri/geometry/Extent",
        'jimu/BaseWidget',
        'jimu/loaderplugins/jquery-loader!./js/jquery.min',
        'jimu/loaderplugins/order-loader!./js/typeahead.bundle.min',
        './widgets/AwsSearch/js/aws-search.js'
    ],
    function(declare, Extent, BaseWidget, jQuery, typeahead, search) {
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget], {
            // DemoWidget code goes here 

            //please note that this property is be set by the framework when widget is loaded.
            //templateString: template,

            baseClass: 'jimu-widget-awssearch',

            name: 'AwsSearch',

            postCreate: function() {
                this.inherited(arguments);
                console.log('postCreate');
                console.log($('#map'));
            },

            startup: function() {
                this.inherited(arguments);
                //this.mapIdNode.innerHTML = 'map id:' + this.map.id;
                var map = this.map;
                var setExtent = function(object) {
                    var extent = new Extent(object);
                    map.setExtent(extent, true);
                    console.log('zoomlevel: ' + map.getZoom());
                }
                var zoomTo = function(point) {
                    map.centerAndZoom(point, 17);
                }
                var s = search.create('.typeahead', setExtent, zoomTo); //setExtent, zoomTo);
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
