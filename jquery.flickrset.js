/**
 * jQuery FlickrSet
 * Display Flickr Photo Sets in a given template
 * 
 * @author Kyle Robinson Young <kyle at dontkry.com>
 * @copyright 2011 Kyle Robinson Young
 * @license MIT license <http://www.opensource.org/licenses/mit-license.php>
 * 
 * Inspired by Joel Sutherland, http://www.newmediacampaigns.com/page/jquery-flickr-plugin
 * and J.P. Given (http://johnpatrickgiven.com)
 * 
 */
(function($) {
	$.fn.flickrSet = function(args, callback) {
		var defaults = {
			'flickrSet': null,
			'flickrKey': null,
			'template': '<a href="{{image_b}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a>',
			'limit': 100
		}
		settings = jQuery.extend({}, defaults, args);
		if (settings.flickrKey === null || settings.flickrSet === null) {
			alert('You must pass an API key and a Flickr setID');
			return;
		}
		return $(this).each(function(key){
			var $container = $(this);
			var container = this;
			var set = null;
			if ($.isArray(settings.flickrSet)) {
				set = settings.flickrSet[key];
			} else {
				set = settings.flickrSet;
			}
			$.getJSON("http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=" + set + "&api_key=" + settings.flickrKey + "&jsoncallback=?", function(data) {
				$.each(data.photoset.photo, function(i, item) {
					if (i < settings.limit) {
						
						// Add Image Sizes
						// http://www.flickr.com/services/api/misc.urls.html
						item['image_s'] = 'http://farm' + item.farm + '.' + 'static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret +'_s.jpg'; // 75x75
						item['image_t'] = 'http://farm' + item.farm + '.' + 'static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret +'_t.jpg'; // 100
						item['image_m'] = 'http://farm' + item.farm + '.' + 'static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret +'_m.jpg'; // 240
						item['image'] = 'http://farm' + item.farm + '.' + 'static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret +'.jpg'; // 500
						item['image_z'] = 'http://farm' + item.farm + '.' + 'static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret +'.jpg'; // 640
						item['image_b'] = 'http://farm' + item.farm + '.' + 'static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret +'_b.jpg'; // 1024
						// TODO: Hold on original, need to find out if gif, png, or jpg.
						//item['image_o'] = 'http://farm' + item.farm + '.' + 'static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret +'_o.jpg'; // ORIGINAL
						
						// Use Template
						var template = null;
						if ($.isArray(settings.template)) {
							template = settings.template[i];
						} else {
							template = settings.template;
						}
						for(var key in item){
							var rgx = new RegExp('{{' + key + '}}', 'g');
							template = template.replace(rgx, item[key]);
						}
						$container.append(template);
					}
				});
				if($.isFunction(callback)){
					callback.call(container, data);
				}
			});
		});
	}
})(jQuery);