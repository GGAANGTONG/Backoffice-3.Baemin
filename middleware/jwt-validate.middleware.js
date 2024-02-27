import authService from "../src/service/auth.service.js";

const jwtValidate = async (req, res, next) => {
    // try {
    // const authorization = req.headers.access;
    const { access } = req.cookies;
    if (!access) {
        throw new Error('인증 정보가 올바르지 않습니다.');
    }
    const [tokenType, tokenValue] = access.split(' ');
    if (tokenType !== 'Bearer') {
        throw new Error('인증 정보가 올바르지 않습니다.');
    }
    if (!tokenValue) {
        throw new Error('인증 정보가 올바르지 않습니다.');
    }
    console.log(tokenType, " and ", tokenValue)

    const user = await authService.verifyAccessToken(tokenValue); // return user
    console.log('jwt-validated user', user)
    res.locals.user = user;

    next();
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: err.message,
    //     })
    // }
}

export default jwtValidate;