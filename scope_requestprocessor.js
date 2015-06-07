//Includes
var cps = require('cps-api');

//Creating a CPS connection

var cpsConn = new cps.Connection(  'tcp://cloud-us-0.clusterpoint.com:9007',  'scope_data',     'nislam17@gmail.com',    'NazifaM3',    'document',    'document/id',     {account: 100338});



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

function insertUser(_name, _email, _long, _lat, _password) {
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

function searchUser(email) {
    var search_req = new cps.SearchRequest('<user><email>' + email + '</email></user>');
    cpsConn.sendRequest(search_req, function (err, search_resp) {
	    if (err) return false;
	    console.log('New user registered: ' + insert_response.document.user);
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


function listFeed(_lat, _long) {
    var search_req = new cps.SearchRequest('*');
    cpsConn.sendRequest(search_req, function (err, search_resp) {
	    if(err) return console.log(err);
	    //console.log(search_resp.results.document[0].name);
	    var resp = search_resp.results.document;
	    for (var i = 0; i < resp.length; i++) {
		console.log(resp[i].user);
	    } 
	});
};

//insertUser('Matthew', 'mkl@nyu.edu', 1, 1, 'password');

//listFeed(0,0); 
//searchUser('currystain@gail.com', 'hyperlocal');
/*insertUser('Nazifa Islam', 'ni444@nyu.edu', 2, 3, 'IAmBeautiful');
insertUser('Mehul Patel', 'currystain@gail.com', -1, -1, 'hyperlocal');
insertUser('Matthew Laikhram', 'iamannoying@annoying.com', 0, 0, 'sexycani');
insertUser('Mohan Dhar', 'iamugly@ugly.com', 1, 10, 'ihavenoimagination');
*/