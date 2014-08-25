define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/json",
    'esri/geometry/Point'
], function(
    declare,
    array,
    lang,
    JSON,
    Point
) {
    console.log('loading aws-search');
    return declare(null, {
        create: function(elementSelector, callback, zoomTo) {
            $(function() {
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
                                    kommunenavn: location.kommune.navn,
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
                }, function($e, datum) {
                    if (datum.lng === '0.0' || datum.lat === '0.0') {
                        var request = $.ajax(datum.url, {
                            context: $e.data.context,
                            type: "GET",
                            dataType: "jsonp"
                        });
                        request.done(function(data) {
                            var p = new Point([data.wgs84koordinat['længde'], data.wgs84koordinat['bredde']]);
                            p.text = datum.text + '<br>' + datum.kommunenavn;
                            $e.data.context.zoomTo(p);
                        });
                    } else {
                        var p = new Point([datum.lng, datum.lat]);
                        p.text = datum.text + '<br>' + datum.kommunenavn;
                        $e.data.context.zoomTo(p);
                    }
                });
                console.log('created typeahead input...');
            });
        },
        setExtent: null,
        zoomTo: null,
        parseResponse: function(data) {
            var result = JSON.parse(data);
            this.setExtent(result.locations[0].extent);
        }
    });
});
