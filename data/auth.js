import SQ from "sequelize";
import {sequelize} from '../DB/database.js';
const DataTypes = SQ.DataTypes; // sequelize 용 데이터타입을 쓴다.

export const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type:DataTypes.STRING(128),
            allownull: false
        },
        name: {
            type: DataTypes.STRING(128),
            allow: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        url: DataTypes.TEXT
    },
    {timestamps: false} // timestamps: 증가되는 시간값
) // table 생성코드

// let users = [
//     {
//         id: '1',
//         username: 'apple',
//         password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
//         name: '김사과',
//         email: 'apple@apple.com',
//         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU'
//     },
//     {
//         id: '2',
//         username: 'banana',
//         password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
//         name: '반하나',
//         email: 'banana@banana.com',
//         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU'
//     },
// ];


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
    // return db.execute('SELECT * FROM users WHERE username=?', [username]).then((result) => result[0][0]);
    return User.findOne({ where: { username }});
}

export async function findById(id) {
    // return users.find((user) => user.id === id);
    // return db.execute('SELECT * FROM users WHERE id=?', [id]).then((result) => result[0][0]);
    return User.findByPk(id); //Pk: Primary Key
}

// export async function createUser(user) {
//     // const created = {...user, id: '10'};
//     // users.push(created);
//     // return created.id;
//     const {username, password, name, email, url} = user;
//     return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId);
// }

export async function createUser(user){
    // const {username, password, name, email, url} = user;
    // return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
    // [username, password, name, email, url]).then((result)=>result[0].insertId)

    return User.create(user).then((data) => data.dataValues.id);
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



