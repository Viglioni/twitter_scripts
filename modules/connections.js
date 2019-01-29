var Twit = require('twit');
const keys = require("./secret_keys");
var T = new Twit(keys);


module.exports = {

    getMyFollowers: function(){
	    return new Promise( (resolve,reject) => {
		T.get('followers/ids', {stringify_ids: true}, (err,data) => {
		    if(err){ reject(err); }
		    else{ resolve(data.ids);}
		});
	    }).then(result => result);
    },

    getMyFriends: function(){
	return new Promise( (resolve,reject) => {
	    T.get('friends/ids', {stringify_ids: true}, (err,data) => {
		if(err){ reject(err); }
		else{ resolve(data.ids);}
	    });
	}).then(result => result);

    },

    getFollowersFrom: function(screen_name){
	return new Promise( (resolve,reject) => {
	    T.get('followers/ids', {stringify_ids: true, screen_name: screen_name}, (err,data) => {
		if(err){ reject(err); }
		else{ resolve(data.ids);}
	    });
	}).then(result => result);
    },
    
    getFriendsFrom: function(screen_name){
	return new Promise( (resolve,reject) => {
	    T.get('friends/ids', {stringify_ids: true, screen_name: screen_name}, (err,data) => {
		if(err){ reject(err); }
		else{ resolve(data.ids);}
	    });
	}).then(result => result);
    },

    unfollow: function(id){
	T.post('friendships/destroy', {id: id},
	       (err,data) => {
		   if(err){  console.log(err + " Id: " + id); }
		   else{ console.log("unfollowed "+ data.screen_name); }
	       });
    },
    
    follow: function(id){
	T.post('friendships/create', {id: id},
	       (err,data) => {
		   if(err){
		       console.log(err + " Id: " + id);
		   }
		   else{
		       console.log("followed "+ data.screen_name);
		   }
	       });  

    },
    
    
};




// function getIdFromScreenName(user){
//     return new Promise((resolve,reject) => {
//         T.get('users/show', {screen_name: user}, (err,data) => {
//             if(err){reject(err);}
//             else{
// 		resolve(data.id);}
//         });
//     }).then(result => result);
// }

// function getScreenNameFromId(id){
//     return new Promise((resolve,reject) => {
//         T.get('users/show', {id: id}, (err,data) => {
//             if(err){reject(err);}
//             else{resolve(data.screen_name);}
//         });
//     }).then(result => result);
// }




// // build friendlist
// function buildFriendlist(friend_list) {
//     return Promise.all( friend_list.map(friend => getIdFromScreenName(friend) ) ).then(result => result);
// }



// function follow_one(friend_id){
//     T.post('friendships/create', {id: friend_id},
// 	   (err,data) => {
// 	       if(err){  console.log(err + " Id: " + friend_id); }
// 	       else{ console.log("followed "+ data.screen_name); }
// 	   });
// }

// function unfollowAll(followers, friends, friend_list){
//     friends.forEach( friend => {
// 	// if friend is not in friend_list and is not your follower
// 	if( friend_list.indexOf(friend) < 0 && followers.indexOf(friend) < 0){
// 	    kill(friend);
// 	}
//     }); 
// }

// function followAll(followers, friends, friend_list){
//     followers.forEach( follower => {
// 	// if friend is not in friend_list and is not your follower
// 	if( friend_list.indexOf(follower) < 0 && friends.indexOf(follower) < 0){
// 	    follow_one(follower);
// 	}
//     }); 
// }


// function follow(){
//     var friend_list = [];

//     Promise.all(
//         [getFollowers(), getFriends(), buildFriendlist(friend_list)]
//     ).then( ([followers, friends, friend_list]) => {
//         console.log(followers.length, friends.length, friend_list);
//         followAll(followers,friends, friend_list);
//     });
// }


// function unfollow(){
//     var friend_list = ["larochkk", "paulaemcima", "phaser_"];

//     Promise.all(
//         [getFollowers(), getFriends(), buildFriendlist(friend_list)]
//     ).then( ([followers, friends, friend_list]) => {
//         console.log(followers.length, friends.length, friend_list);
//         unfollowAll(followers,friends, friend_list);
//     });
// }


// follow();

