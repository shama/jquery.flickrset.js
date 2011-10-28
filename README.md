# jQuery Flickr Set

Display flickr sets using a template.

## Usage

    <script src="js/jquery.flickrset.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function() {
        // Change <ul id="gallery1"></ul> and <ul id="gallery2"></ul> into flickr galleries
    	$('#gallery1,#gallery2').flickrSet({
    		// Use an array; same thing can be done with the template
    		'flickrSet': ['123456789123456', '123456789456123'], 
    		'flickrKey': '123456789abcdefghijklmnopqrstuvwxyz',
    		'template': '<li><a href="{{image_b}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
    	}, function(data) {
    		// CALL AFTER FLICKR LOADED
    	});
    });
    </script>

## License

jquery.flickrset.js is offered under an [MIT license](http://www.opensource.org/licenses/mit-license.php).

## Copyright

2011 Kyle Robinson Young, [dontkry.com](http://dontkry.com)

If you found this release useful please let the author know! Follow on [Twitter](http://twitter.com/kyletyoung)
