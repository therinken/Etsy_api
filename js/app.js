_.templateSettings.interpolate = /{([\s\S]+?)}/g;

function EtsyClient(options) {
    if (!options.api_key) {
        throw new Error("Yo dawg, I heard you like APIs. Y U NO APIKEY!?!?");
    }
    this.etsy_url = "https://openapi.etsy.com/";
    this.version = options.api_version || "v2/";
    this.api_key = options.api_key;
    this.complete_api_url = this.etsy_url + this.version;

    this.init();
};

EtsyClient.prototype.pullAllActiveListings = function() {
    var model = 'listings';
    var filter = 'active';
    return $.getJSON(this.complete_api_url + model + '/' + filter + ".js?api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
};

EtsyClient.prototype.getListingInfo = function(id) {
    var model = 'listings';
    return $.getJSON(this.complete_api_url + model + '/' + id + ".js?api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    })
}

EtsyClient.prototype.getUserInfo = function() {
    //var testusername = 'user_id'
    return $.getJSON(this.complete_api_url + testusername + '.js?callback=' + 'getData&' + this.api_key).then(function(data) {
        console.log(data);
    })
}

EtsyClient.prototype.loadTemplateFile = function(templateName){
    return $.get('./templates/' + templateName + '.html').then(function(htmlstring) {
        return htmlstring;
    })
}

EtsyClient.prototype.putProfileDataOnPage = function(profileHtml, profile) {
    document.querySelector('').innerHTML = _.template(profileHtml, profile);
}

EtsyClient.prototype.putListingDataOnPage = function(listingHtml, listing) {
    document.querySelector('').innerHTML = _.template(listingHtml, listing);
}

EtsyClient.prototype.putCartDataOnPage = function(cartHtml, cart) {
    document.querySelector('').innerHTML = _.template(cartHtml, cart);
};

EtsyClient.prototype.init = function() {
    var self = this;

    $.when(
        this.pullAllActiveListings(),
        this.getListingInfo(),
        this.loadTemplateFile('profile'),
        this.loadTemplateFile('listing'),
        this.loadTemplateFile('cart')
        ).then(function(profile, listing, cart, profileHtml, listingHtml, cartHtml) {
            self.putProfileDataOnPage(profileHtml, profile)
            self.putListingDataOnPage(listingHtml, listing)
            self.putCartDataOnPage(cartHtml, cart)
        })
};

window.onload = app;

function app(){
    var myEtsy = new EtsyClient({api_key: "aavnvygu0h5r52qes74x9zvo"});
    myEtsy.pullAllActiveListings();
}

/*
var api_key = "cl15l8v7ye4vxkqzypp5pyk8";

var etsy_url = [
    "https://openapi.etsy.com/",
    "v2/",
    "listings/",
    "active.js",
    "?",
    "api_key=",
    api_key,
    "&callback=?"
].join();

$.getJSON(etsy_url).then(function(data){
    console.log(data);
});
 */