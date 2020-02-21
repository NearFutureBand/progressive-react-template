const Router = require('koa-router');
const router = new Router();

const { generateSmsCode } = require('../../helpers');

const { handleError, makeJWT, validateJWT } = require('../../helpers');
const {
  getUserByPhone,
  setVeryfingCodeToUser,
  getSmsCodeByPhone,
  createUser,
} = require('../../queries');

const smsFlow = async (phone) => {
  const smsCode = generateSmsCode();
  console.log('smsCode: ', smsCode); // send sms to user
  await setVeryfingCodeToUser({ phone, code: smsCode });
}

router.post('/auth/is-user-signed-in', async (ctx) => {
  try {
    const { phone, token } = ctx.request.body;
    const [user] = await getUserByPhone(phone);

    if (!user) {
      ctx.status = 422;
      ctx.message = `User doesn't exist`;
      await createUser(phone);
      await smsFlow(phone);
      return;
    }

    const isTokenValid = token ? validateJWT(token, user.phone) : false;

    if (!isTokenValid) {
      ctx.status = 422;
      ctx.message = 'Token is wrong or expired';
      await smsFlow(phone);
      return;
    }

    ctx.body = {
      ...user,
      token: makeJWT({ phone: user.phone }), // update JWT
    }
  } catch (err) {
    handleError(err, ctx);
  }
});

router.post('/auth/verify-code', async (ctx) => {
  try {
    const { phone, smsCode } = ctx.request.body;

    if (!smsCode) {
      ctx.message = 422;
      ctx.message = 'Sms code cannot be NULL';
      return;
    }

    const [{ code }] = await getSmsCodeByPhone(phone);

    if (code !== smsCode) {
      ctx.status === 403;
      ctx.message = 'Sms code is wrong';
      return;
    }

    await setVeryfingCodeToUser({ phone });
    const [user] = await getUserByPhone(phone);

    ctx.code = 200;
    ctx.message = 'Code is correct';
    ctx.body = {
      ...user,
      token: makeJWT({ phone: user.phone }), // update JWT
    }
  } catch (err) {
    handleError(err, ctx);
  }
})



module.exports = router;