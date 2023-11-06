/*
회원가입
    router.post('/signup', ...)
    로그인
    router.post('/login', ...)
    JWT 확인
    router.get('/me', ...)
*/
import express from "express";
import * as authController from '../controller/auth.js'



const router = express.Router();

router.post('/signup', authController.signup)

router.post('/login', authController.login)