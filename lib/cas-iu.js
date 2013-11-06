var request = require("request");

module.exports = function(service_url) {
    var cas_url = "https://cas.iu.edu/cas";
    function validate(ticket, callback) {
	var validate_url = cas_url+"/validate";
	var query = {ticket:ticket, service:service_url};
	request.get({url:validate_url, qs:query}, function (err, res,  body) {
	    var sections = body.split("\n");
	    var validated = sections[0].trim() == "yes";
	    var username = null;
	    if (sections.length > 1) {
		username = sections[1].trim();
	    }
	    callback(err, validated, username);
	});
    }	     
    return {
	validate:validate, 
	login_url:cas_url+"/login?cassvc=IU&casurl="+service_url,
	logout_url:cas_url+"/logout"
    };
}
