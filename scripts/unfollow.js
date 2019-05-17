/* * * * * * * * * * * * * * * * * * * * * * * *
 * This script was made by Laura Viglioni      *
 * https://github.com/viglioni                 *
 * 2019                                        *
 * License: GNU GENERAL PUBLIC LICENSE v3      *
 * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * To run this script you must install:        *
 * > node                                      *
 * > lib 'twit' https://github.com/ttezel/twit *
 * About the secret_keys, I recommend          *
 * this class https://youtu.be/7-nX3YOC4O      *
 * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * usage:                                      *
 *    $ node unfollow.js                       *
 *                                             *
 * * * * * * * * * * * * * * * * * * * * * * * */


console.log("The script started\n\n");

var Twit = require('twit');
const keys = require("../modules/secret_keys");
var T = new Twit(keys);
var Connections = require("../modules/connections");
var IdList = require("../modules/id_list");
var {friends} = require("../modules/people");

// People you do not want to unfollow
const friend_list = friends;




// unfollow all friends that dont follow you back and arent in your friend_list 
Promise.all([
    IdList.buildIdList(friend_list),
    Connections.getMyFollowers(),
    Connections.getMyFriends()
]).then(
    ([friend_list, followers, friends]) => {
	
	console.log("You have " + followers.length + " followers and " + friends.length + " friends");
	
	friends.forEach(friend => {
	    if(friend_list.indexOf(friend) < 0 && followers.indexOf(friend) < 0){
		Connections.unfollow(friend);
	    }
	});
    });



