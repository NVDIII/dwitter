import MongoDb from 'mongodb';
import { getTweets } from '../DB/database.js';
import * as UserRepository from './auth.js';
const ObjectID = MongoDb.ObjectId;


// import { db } from '../db/database.js';

export async function getAll() {
    return getTweets()
        .find()
        .sort({ createAt: -1 })
        .toArray()
        .then(mapTweets);
}
export async function getAllByUsername(username) {
    return getTweets()
        .find({ username })
        .sort({ createAt: -1 })
        .toArray()
        .then(mapTweets);
}
export async function getById(id) {
    return getTweets()
        .find( {_id: new ObjectID(id)})
        .next()
        .then(mapOptionalTweet);
}
export async function create(text, userId) {
    return UserRepository.findById(userId)
        .then((user) => {
            getTweets().insertOne({
                text,
                createdAt: new Date(),
                userId,
                name: user.name,
                username: user.username,
                url: user.url
            })
        })
        .then((result) => result)
        .then(mapOptionalTweet);

}
export async function update(username, text) {
    return UserRepository.findById(id)
        .then((user) => {
            getTweets().insertOne({
                text,
                createdAt: new Date(),
                name: user.name,
                username
            })
        })
        .then((result) => result)
        .then(mapOptionalTweet);
}
export async function remove(id) {
    return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}

function mapOptionalTweet(tweet){
    return tweet ? { ...tweet, id: tweet._id} : tweet;
}
function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}