//如果有route用到這裡的middleware:passport.authenticate("jwt")，這裡的程式碼就會被執行
import {
    Strategy as JwtStrategy,
    ExtractJwt
} from "passport-jwt"
import User from "../models/User-model.js";

//export 一個fn =>
export default (passport) => {
    let opts = {};
    //ExtractJwt => 提取Jwt的部分
    //fromAuthHeaderWithSchema("jwt")=> req.key=Authorization, value = user.token
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.PASSPORT_SECRET;
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) return done(err, false);//err
                if (!user) return done(null, false);//沒有這個user
                done(null, user);
            })
        }))
}