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
        create: function(elementSelector, zoomTo, map) {
            $(function() {

                var addresses = new Bloodhound({
                    name: 'ago-geocode',
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    limit: 20,
                    remote: {
                        url: 'http://webapi.aws.dk/adresser.json?q=%QUERY&maxantal=20',
                        rateLimitWait: 300,
                        filter: function(response) {
                            return $.map(response, function(location) {
                                return {
                                    text: (location.husnr) ? 
                                        location.vejnavn.navn + ' ' + location.husnr + ', ' + location.postnummer.nr: 
                                        location.vejnavn.navn + ', ' + location.postnummer.nr + ' ' + location.postnummer.navn,
                                    magicKey: location.vejnavn.kode,
                                    adresse: location.vejnavn.navn + ' ' + location.husnr,
                                    postadresse: location.postnummer.nr + ' ' + location.postnummer.navn,
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
                            if (typeof(data.wgs84koordinat) == 'undefined') {
                                console.log(data);
                            } else if (typeof(data.wgs84koordinat['længde']) == 'undefined') {
                                console.log(data);
                            } else {
                                var p = new Point([data.wgs84koordinat['længde'], data.wgs84koordinat['bredde']]);
                                p.text = datum.adresse + '<br>' + datum.postadresse + '<br>' + datum.kommunenavn;
                                zoomTo(p);
                            }
                        });
                    } else {
                        var p = new Point([datum.lng, datum.lat]);
                        p.text = datum.adresse + '<br>' + datum.postadresse + '<br>' + datum.kommunenavn;
                        zoomTo(p);
                    }
                }).on('typeahead:opened', function($e, datum) {
                    map.disableKeyboardNavigation();
                }).on('typeahead:closed', function($e, datum) {
                    map.enableKeyboardNavigation();
                });
                console.log('created typeahead input...');
            });
        }
    });
});
