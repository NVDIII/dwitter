import {db} from '../DB/database.js';



// export async function signup(id, username, password, name, email, url){
//     const hashed = bcrypt.hashSync(password, 10)
//     const user = {
//         id,
//         username,
//         password:hashed,
//         name,
//         email,
//         url
//     }
//     users = [user, ...users]
//     return users
// }

// export async function login(id,password){
//     const user = users.find((user)=> user.id === id)
//     return bcrypt.compareSync(password, user.password)
// }

// 강사님 답
export async function findByUsername(username) {
    // return users.find((user) => user.username === username);
    return db.execute('SELECT * FROM users WHERE username=?', [username]).then((result) => result[0][0]);
    
}

export async function findById(id) {
    // return users.find((user) => user.id === id);
    return db.execute('SELECT * FROM users WHERE id=?', [id]).then((result) => result[0][0]);
}
export async function createUser(user){
    const {username, password, name, email, url} = user;
    return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
    [username, password, name, email, url]).then((result)=>result[0].insertId)
}

// export async function signup(id, username, password, name, email, url){
//     const user = {
//         id,
//         username,
//         password,
//         name,
//         email,
//         url
//     }
//     users = [user, ...users]
//     return users
// }



