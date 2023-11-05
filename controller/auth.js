import * as authRepository from '../data/auth.js';

//signup
export async function signup(req, res, next){
    const {id, username, password, name, email, url} = req.body;
    const user = await authRepository.signup(id, username, password, name, email, url)
    res.status(201).json(user)
}

//login