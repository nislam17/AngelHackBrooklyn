//Includes
var cps = require('cps-api');
 
//Creating a CPS connection
 
var cpsConn = new cps.Connection(  'tcp://cloud-us-0.clusterpoint.com:9007',  'scope_NM3_data',     'nislam17@gmail.com',    'NazifaM3',    'document',    'document/id',     {account: 100338});
 
 
 
// Debug
cpsConn.debug = true;
 
//Helper functions
 
//randomly generated global unique id
var c = 1;
function cuniq() {
    var d = new Date(),
        m = d.getMilliseconds() + "",
        u = ++d + m + (++c === 10000 ? (c = 1) : c);
 
    return u;
};
 
 
// Insert
 
function insertUser(_name, _email, _lat, _long, _password) {
    var id = cuniq();
    var insert_request = new cps.InsertRequest('<document><id>'
                                               + id +'</id>'+'<user><name>'
                                               + _name + '</name><email>'
                                               + _email + '</email><location><latitude>'
                                               + _lat + '</latitude><longitude>'
                                               + _long + '</longitude></location><userID>'
                                               + id + '</userID><password>'
                                               + _password + '</password></user></document>');
    cpsConn.sendRequest(insert_request, function(err, insert_response) {
            if (err) return console.error(err);
            console.log('New user registered: ' + insert_response.document.id);
        });
};
 
 
function insertHave(_userID, _product, _desc, _img, _date, _price){
    var id = cuniq();
    var insert_request = new cps.InsertRequest('<document><id>'
                                               +id+'</id>'+'<have><product>'
                                               + _product + '</product><description>'
                                               + _desc + '</description><image>'
                                               + _img + '</image><userID>'
                                               + _userID + '</userID><date>'
                                               + _date + '</date><price>'
                                               + _price + '</price><matched>false</matched></have></document>');
    cpsConn.sendRequest(insert_request, function(err, insert_response) {
            if (err) return console.error(err);
            console.log('New need added: ' + insert_response.document.id);
        });
};
 
function insertNeed(_userID, _product, _desc, _date){
    var id = cuniq();
    var insert_request = new cps.InsertRequest('<document><id>'
                                               +id+'</id>'+'<need><product>'
                                               + _product + '</product><description>'
                                               + _desc + '</description><userID>'
                                               + _userID + '</userID><date>'
                                               + _date + '</date><matched>false</matched></need></document>');
    cpsConn.sendRequest(insert_request, function(err, insert_response) {
            if (err) return console.error(err);
            console.log('New need added: ' + insert_response.document.id);
        });
};
function deletePost(_id) {
    var id = { id: _id};
    cpsConn.sendRequest(new cps.DeleteRequest(id), function (err, delete_resp) {
            if (err) return console.log(err);
        });
   
};
 
function searchEmail(email) {
    var search_req = new cps.SearchRequest('<user><email>' + email + '</email></user>');
    cpsConn.sendRequest(search_req, function (err, search_resp) {
            if (err) return console.log(err); //return false;
            //console.log('User found: ' + insert_response.document.user);
            console.log(search_resp.results.document);
            return true;
        });
};
 
function searchUser(email, password) {
    var search_req = new cps.SearchRequest('<user><email>' + email + '</email><password>' + password + '</password></user>');
    cpsConn.sendRequest(search_req, function (err, search_resp) {
            if (err) return console.log(err);
            console.log(search_resp.results.document);
        });
};
 
//Algo to calculate the shortest straight line distance, betwween two users using the Havershine's formula.
function distance(lat, longi, lat2, lon2) {
  var radlat1 = Math.PI * lat/180
  var radlat2 = Math.PI * lat2/180
  var radlon1 = Math.PI * longi/180
  var radlon2 = Math.PI * lon2/180
  var theta = longi-lon2
  var radtheta = Math.PI * theta/180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
      return dist;
}
 
function listRect(_lat, _long) {
    var search_req = new cps.SearchRequest('<user><location><latitude>&lt;=' + (_lat + 0.0144927536) + ' &gt;=' + (_lat - 0.0144927536) +
                                           '</latitude><longitude>&lt;=' + (_long + 0.0144927536) + ' &gt;=' + (_long - 0.0144927536) +
                                           '</longitude></location></user>');
    cpsConn.sendRequest(search_req, function (err, search_resp) {
            if (err) return console.log(err);
            console.log(search_resp.results.document);
        });
};
 
function listHaves(userID) {
    var search_req = new cps.SearchRequest('<have><userID>' + userID + '</userID></have>');
    cpsConn.sendRequest(search_req, function (err, search_resp) {
            if (err) return console.log(err);
            console.log(search_resp.results.document);
        });
}
 
function listNeeds(userID) {
    var search_req = new cps.SearchRequest('<need><userID>' + userID + '</userID></need>');
    cpsConn.sendRequest(search_req, function (err, search_resp) {
            if (err) return console.log(err);
            console.log(search_resp.results.document);
        });
}

// Update will also insert a document if one does not exist
// Insert
/*
function updatePost(id) {
    var update_request = new cps.UpdateRequest('<document><id>'
					       + id + </id> '<matched>true</matched></document>');
    cpsConn.sendRequest(update_request, function(err, update_response) {
	    if (err) return console.error(err);
	});

} 
*/
function findMatches(product) {
    var search_req = new cps.SearchRequest('<have><product>' + product + '</product></have>');
    cpsConn.sendRequest(search_req, function (err, search_resp) {
            if (err) return console.log(err);
            console.log(search_resp.results.document);
	    var products = search_resp.results.document;
	    for(var i = 0; i < products.length; i++ ) {
		updatePost(products[i].id);
	    }
	});
}
 
function listFeed(_lat, _long) {
    var counter = 0;
    var search_req = new cps.SearchRequest('*');
    //console.log(search_req);
    cpsConn.sendRequest(search_req, function (err, search_resp) {
            if(err) return console.log(err);
            //console.log(search_resp.results.document[0].name);
            var resp = search_resp.results.document;
            //console.log(resp);
            for (var i = 0; i < resp.length; i++) {
                //console.log(resp[i].user.location.latitude);
                var result = distance(_lat, _long, resp[i].user.location.latitude, resp[i].user.location.longitude )/69;
                // console.log("Lat 1 " + _lat);
                // console.log("Long 1 " + _long);
                // console.log("Lat 2 " + resp[i].user.location.latitude);
                // console.log("Long 2 " + resp[i].user.location.longitude);
                // console.log(result);
                //console.log(result);
                //console.log(resp[i].user);
                //if (Math.pow(resp[i].user.location.latitude - _lat, 2) + Math.pow(resp[i].user.location.longitude - _long, 2) <= Math.pow((1/69), 2)){
		if(result <= 1){
                         
		    console.log(resp[i].user);
                    counter++;
		}
	    } s             // console.log("BITCHHHHITCHHHHITCHHHHITCHHHHITCHHHHITCHHHHITCHHHHITCHHHHITCHHHHITCHHHHITCHHHHHHH");
		  // console.log(counter);
		  });
};
 
//var id = 1433662989016152;
//insertHave(14336752413363352, 'item9', 'item #9', '4/6/67');
//deletePost(14336828503933923);
//findMatches('item9');
/*for(var i = 0; i < 10; ++i)
    insertNeed(id, 'item' + i, 'this is item #' + i, '4/5/67');
 
for(var i = 10; i < 14; ++i)
    insertHave(id, 'item' + i, 'this is item #' + i, 'img', '2/4/15', '$10');
*/

//listHaves(id);
//listNeeds(id);
//var temp_lat = 51.863363;
//var temp_long = 0.232375;
//insertUser('Matthew', 'mkl@nyu.edu', 1, 1, 'password');
/*for (var i = 0; i < 8; ++i)
    insertUser('Matt' + i, 'mlaikhram' + i + '@gmail.com', (temp_lat + (i*.0005)), (temp_long + (i*.0005)), 'password' + i);
*/
//insertUser('Matthew', 'matt@gmail.com', 1, 1, 'password');
//searchUser('bbeebb', 'lionebbb');
//listRect(51.863363, 0.232375);
//searchEmail('matt@gmail.com');
//listFeed(51.5034431,-.1279631);
//searchUser('currystain@gail.com', 'hyperlocal');
/*insertUser('Nazifa Islam', 'ni444@nyu.edu', 2, 3, 'IAmBeautiful');
insertUser('Mehul Patel', 'currystain@gail.com', -1, -1, 'hyperlocal');
insertUser('Matthew Laikhram', 'iamannoying@annoying.com', 0, 0, 'sexycani');
insertUser('Mohan Dhar', 'iamugly@ugly.com', 1, 10, 'ihavenoimagination');
*/