const authService = require('../src/service/auth.service');

const jwtValidate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }
        const [tokenType, tokenValue] = authorization.split(' ');
        if (tokenType !== 'Bearer') {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }

        if (!tokenValue) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }

        const user = await authService.verifyAccessToken(tokenValue);

        res.locals.user = user;

        next();
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports = jwtValidate