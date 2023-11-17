import MongoDb from 'mongodb';
import { getTweets } from '../DB/database.js';
import * as UserRepository from './auth.js';


// import { db } from '../db/database.js';

export async function getAll() {
    return getTweets()
        .find()
        .sort({ createAt: -1 })
        .toArray()
        .then(mapTweets);
}

}
export async function update(username, text) {
    return UserRepository.findById(id)
        .then((user) => {
            getTweets().insertOne({
                text,
                createdAt: new Date(),
                name: user.name,
            username: user.username,
            url:user.url
        }).save()
    );
}

export async function update(id, text) {
    return Tweet.findByIdAndUpdate(id, {text}, {
        returnDocument: "after"
    })
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