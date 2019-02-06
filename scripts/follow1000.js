/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * This script was made by Laura Viglioni          *
 * https://github.com/viglioni                              *
 * 2019                                                               *
 * License: GNU GENERAL PUBLIC LICENSE v3  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * To run this script you must install:         *
 * > node                                                   *
 * > lib 'twit' https://github.com/ttezel/twit *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * *  * * * * * * * *
 * usage:                             *
 *    $ node follow1000.js    *
 * * * * * * * * * * * * * * * *  */

console.log("The script started\n\n");

var Twit = require('twit');
const keys = require("../modules/secret_keys");
var T = new Twit(keys);
var Connections = require("../modules/connections");
var IdList = require("../modules/id_list");

// People you do not want to follow
const ENEMY_LIST = [];

// Max number of people you want to follow, default is 1000
const MAX = 10;

// The person you want to follow zir followers, e.g. "viglionilaura"
const TARGET = "";


// execution
follow1000(ENEMY_LIST, MAX, TARGET);


/******** Methods ********/
/** follow1000
 * @param ENEMY_LIST (arr): array of user of people you dont want to follow
 * @param MAX (int): Number of follow trials
 * @param TARGET (str): screen_name of someone you want to follow zir followers
 * @return void
 */
function follow1000(ENEMY_LIST, MAX, TARGET) {
    Promise.all( [ 
        Connections.getMyFriends(),
        Connections.getFollowersFrom( TARGET ),
        IdList.buildIdList( ENEMY_LIST )
    ])
        .then( ([friends, target_followers, enemy_list]) => {
            console.log(friends.length);
            let to_be_followed = getFollowList(friends , target_followers, enemy_list, MAX);
            followOne( to_be_followed, 0, to_be_followed.length);
        });    
}


// Filter list
/** getFollowList
 * @param friends (arr): array of IDs of people you've already follow
 * @param big_list (arr): array of IDs of people you intent to follow
 * @param enemy_list (arr): array of IDs of people you dont want to follow
 * @param max (int): the maximum number of people in the return array
 * @return (arr): Array of IDs of maximum size @param max of people to be followed
*/
function getFollowList(friends, big_list, enemy_list, max){
    return big_list.filter( person => friends.indexOf(person) < 0 && enemy_list.indexOf(person) < 0).splice(0,max);
}

/** followOne
 * @param to_be_follow (arr): array of IDs of people you intent to follow
 * @param waiting_time (int): time in seconds to wait
 * @param max (int): initial array size of @param to_be_followed
 * @return (arr): Array of IDs of maximum size @param max of people to be followed
*/
function followN(waiting_time, accounts){
    if (accounts.length === 1){
      followOne(waiting_time, accounts.pop())
    }
    else {
      let person = accounts.pop();
      followOne(waiting_time, person)
      followN(waiting_time, accounts);
    }
}

function followOne(waiting_time, person){
   setTimeout( () => { Connections.follow( person); }, waiting_time);
}
