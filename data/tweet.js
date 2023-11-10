// import * as userRepository from './auth.js'
import {db} from '../DB/database.js'

const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id';

const ORDER_DESC = 'ORDER BY tw.createdAt DESC';
// let tweets = [
//     {
//         id: '1',
//         text: '안녕하세요!',
//         createdAt : Date.now().toString,
//         userId:'1'
//     },
//     {
//         id: '2',
//         text: '반갑습니다!',
//         createdAt : Date.now().toString,
//         userId:'2'
//     }
// ]; 

export async function getAll() {
    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const {username, name, url} = await userRepository.findById(tweet.userId);
    //         return { ...tweet, username, name, url };
    //     })
    // );
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

export async function getAllByUsername(username){
    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
    return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then((result) => result[0]);
}

export async function getById(id){
    // const found = tweets.find((tweet) => tweet.id === id);
    // if (!found) {
    //     return null;
    // }
    // const { username, name, url } = await userRepository.findById(found.userId);
    // return { ...found, username, name, url };
    return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]).then((result) => result[0][0]);
}

export async function create(text, userId){
    // const tweet = {
    //     id:'10',
    //     text,
    //     createdAt: Date.now().toString(),
    //     userId
    // }
    // tweets = [tweet, ...tweets]
    // return getById(tweet.id);
    return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [text, new Date(), userId]).then((result) => getById(result[0].insertId));
}

export async function update(id, text){
    // const tweet = tweets.find((tweet) =>tweet.id === id)
    // if (tweet){
    //     tweet.text = text
    // }
    // return getById(tweet.id);
    return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id]).then(() => getById(id));
}

export async function remove(id){
    return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}