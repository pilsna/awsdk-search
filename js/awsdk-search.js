define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/json",
    "dojo/store/Memory",
    "dojo/store/JsonRest",
    "dijit/form/ComboBox",
    "dojo/domReady!"
], function(
    declare,
    array,
    dom,
    JSON,
    Memory,
    JsonRest,
    ComboBox
) {
    console.log("loading module awsdk-search");

    var restStore = new JsonRest({
        target: "http://webapi.aws.dk/adresser.json?maxantal=20"
        //target: "/webapp/widgets/awsdk-search/js/menu.json"
    });
    // Query for objects with options
/*    restStore.query("&q=Tåsinge", {
        start: 1,
        count: 2
    }).then(function(results) {
    	console.log(results);
        // results should contain up to 10 items, sorted by "baz" in descending fashion
    });

    var comboBox1 = new ComboBox({
        store: restStore,
        searchAttr: "id",
        autocomplete: true,
        placeholder: "Søg adresse"
    }, "comboBox1Placeholder");

    comboBox1.startup();
*/
    return declare(null, {
        print: function(param1, param2) {
            //dom.byId(id).innerHTML = dateFormatter.format(date);
            console.log("param1: " + param1);
            console.log("param2: " + param2);
            console.log($(".typeahed"));
        },
        create: function(elementSelector, callback, zoomTo) {
            this.setExtent = callback;
            this.zoomTo = zoomTo;
            var addresses = new Bloodhound({
                name: 'ago-geocode',
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                limit: 15,
                remote: {
                    url: 'http://webapi.aws.dk/adresser.json?q=%QUERY&maxantal=20',
                    rateLimitWait: 300,
                    filter: function(response) {
                        return $.map(response, function(location) {
                            return {
                                text: (location.husnr) ? location.vejnavn.navn + ' ' + location.husnr + ', ' + location.postnummer.nr : location.vejnavn.navn + ', ' + location.postnummer.nr,
                                magicKey: location.vejnavn.kode,
                                url: location.vejnavn.href,
                                lng: location.wgs84koordinat['længde'],
                                lat: location.wgs84koordinat['bredde']
                            };
                        });
                    },
                    ajax: {
                        type: "GET",
                        dataType: "jsonp"
                    }

                }
            });
            addresses.initialize();
            console.log('created bloodhound...');
            $(elementSelector).typeahead(null, {
                name: 'text',
                displayKey: 'text',
                source: addresses.ttAdapter()
            }).on('typeahead:selected', {
                context: this
            }, this.selected);
            console.log('created typeahead input...');
        },
        setExtent: null,
        zoomTo: null,
        parseResponse: function(data) {
            var result = JSON.parse(data);
            this.setExtent(result.locations[0].extent);
        },
        selected: function($e, datum) {
            if (datum.lng === '0.0' || datum.lat === '0.0') {
                var request = $.ajax(datum.url, {
                    context: $e.data.context,
                    type: "GET",
                    dataType: "jsonp"
                });
                request.done(function(data) {
                    $e.data.context.zoomTo([data.wgs84koordinat['længde'], data.wgs84koordinat['bredde']]);
                });
            } else {
                $e.data.context.zoomTo([datum.lng, datum.lat]);
            }
        }
    });
});
