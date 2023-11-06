/*
회원가입
    router.post('/signup', ...)
    로그인
    router.post('/login', ...)
    JWT 확인
    router.get('/me', ...)
*/
// import express from "express";
// import * as authController from '../controller/auth.js'



// const router = express.Router();

// router.post('/signup', authController.signup)

// router.post('/login', authController.login)

// export default router;

//강사님 답
import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();
const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username은 반드시 입력해야함'),
    body('password')
        .trim()
        .isLength({ min : 4 })
        .withMessage('password는 반드시 4자 이상이여야 함'),
    validate
]
const validateSignup = [
    ...validateCredential, // validateCredential에 있는 것들을 가져옴
    body('name').notEmpty().withMessage('name은 반드시 입력'),
    body('email').isEmail().withMessage('email형식 확인'),
    body('url').isURL().withMessage('URL 형식 확인')
        .optional({ nullable: true, checkFalsy: true}), // nullable: 값이 없어도 상관없다. checkFalsy: False로 판별되는 것을 null로 처리
    validate
]



router.post('/signup', validateSignup, authController.signup);
// router.post('/login', validateCredential, );

router.post('/login', validateCredential, authController.login);

// JWT 확인
router.get('/me', isAuth,authController.me); // me를 쓰는 이유 : 쿠키와 같은 역할이지만 쿠키는 브라우저를 닫았다 열면 자동으로 사라진다. 그 점 때문에 브라우저를 닫아도 사라지지 않는 me token을 발행하여 웹사이트 방문 여부를 알 수 있도록 하기 위함.

export default router;