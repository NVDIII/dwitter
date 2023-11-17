import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

//signup
// export async function signup(req, res, next){
//     const {id, username, password, name, email, url} = req.body;
//     const user = await authRepository.signup(id, username, password, name, email, url)
//     res.status(201).json(user)
// }

//login// import * as authRepository from '../data/auth.js';

// //signup
// export async function signup(req, res, next){
//     const {id, username, password, name, email, url} = req.body;
//     const user = await authRepository.signup(id, username, password, name, email, url)
//     res.status(201).json(user)
// }

// //login
// export async function login(req, res, next){
//     const {id, password} = req.body;
//     const user = await authRepository.login(id, password);
//     if (user) {
//         return res.status(200).json({message: `로그인 되었습니다.`})
//     }else{
//         return res.status(404).json({message: `로그인이 되지 않았습니다.`})
//     }
// }

// 강사님 답


// 설정파일로 적용할 예정
// const jwtSecretKey = 'abcdef!@$%^&*()';
// const jwtExpiresInDays = '2d'; // 이틀이 지나가게 된다
// const bcryptSaltRounds = 12;

export async function signup(req, res) {
    const { username, password, name, email, url } = req.body;
    const found = await userRepository.findByUsername(username);
    if (found) {
        return res.status(409).json({ message: `${username}이 이미 가입되었음`});
    }

    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url
    });
    const token = createJwtToken(userId);
    res.status(201).json({token, username}); // create는 status(201)번이 좋다(?)
}

export async function login(req, res) {
    const { username, password } = req.body;
    const user = await userRepository.findByUsername(username)
    if(!user) {
        return res.status(401).json({message: '사용자를 찾을 수 없습니다'})
    }

    const isValidpassword = bcrypt.compareSync(password, user.password)
    if(!isValidpassword) {
        return res.status(401).json({message: '비밀번호가 틀렸습니다'})
    }

    const token = createJwtToken(user.id)
    res.status(200).json({token, username})

}

function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec});
}

export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없음'});
    }
    res.status(200).json( { token: req.token, username: user.username });
}