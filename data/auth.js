import Mongoose from "mongoose";
import {useVirtualId} from "../DB/database.js";

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    url: String
}); // required: true = 값이 무조건 있어야 한다.

useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema) // model() = collection을 생성하게 된다, 'User': collection name(뒤에 s가 자동으로 붙는다.)

export async function findByUsername(username){
    return User.findOne({ username });
}
export async function findById(id){
    return User.findById(id); // mongodb 안에 있는 findById 메서드. 바깥의 findById와 다름.
}
export async function createUser(user){
    return new User(user).save().then((data) => data.id);
}