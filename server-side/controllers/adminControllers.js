const EducationCategories = require("../model/educationCategoryModel");
const Feedback = require("../model/feedbackModel");
const Notices = require("../model/noticeModel");
const Videos = require("../model/videoModel");
//const Admins = require("../model/adminModel");
const AdminSessions = require("../model/adminSessionModel");

module.exports.adminLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await Admins.findOne({ username: username });
        if (!user) return res.json({ status: false, msg: "Incorrect Username or Password" });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ status: false, msg: "Incorrect Username or Password" });
        const cookieID = randomUUID();
        const session = await AdminSessions.findOne({ username: username });
        if (session)
            await AdminSessions.remove({ username: username });
        await AdminSessions.create({ username: username, cookieID: cookieID });
        const cookie = jwt.sign(
            { "cookieID": cookieID },
            process.env.COOKIE_SECRET_KEY,
            { expiresIn: "1d" }
        );
        res.cookie("jwt", cookie, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.json({ status: true, data: { username: user.username } });
    }
    catch (ex) {
        next(ex);
    }

};


module.exports.videos = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const videos = await Videos.find();
            return res.json({ status: true, data: videos });
        }
        else
            return res.json({ status: false, msg: "Session expired" });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.videoDelete = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const { videoID } = req.body;
            const video = await Videos.find({ _id: videoID });
            if (!video) return res.json({ status: false, msg: "Video doesn't exist" });
            await Videos.remove({ _id: videoID });
            return res.json({ status: true });
        }
        else
            return res.json({ status: false, msg: "Session expired" });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.videoCreate = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const { title, ytLink } = req.body;
            const video = await Videos.find({ $or: [{ title: title }, { ytLink: ytLink }] });
            if (video) return res.json({ status: false, msg: "Video already exist" });
            await Videos.create({ title: title });
            return res.json({ status: true });
        }
        else
            return res.json({ status: false, msg: "Session expired" });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.feedback = async (req, res, next) => {
    try {
        let cookieID;
        const cookie = req.cookies.jwt;
        jwt.verify(
            cookie,
            process.env.COOKIE_SECRET_KEY,
            (err, decoded) => {
                if (err)
                    return res.json({ status: false, msg: "Invalid cookieID" });
                cookieID = decoded.cookieID;
            }
        );
        const session = await AdminSessions.findOne({ username: username });
        if (cookieID == session.cookieID) {
            const feedback = await Feedback.find();
            return res.json({ status: true, data: feedback });
        }
        else
            return res.json({ status: false, msg: "Session expired" });
    }
    catch (ex) {
        next(ex);
    }

};

module.exports.adminLogout = async (req, res, next) => {
    try {
        if (!req.params.username)
            return res.status(400).json({ status: false, msg: "Username is required" });
        const username = req.params.username;
        const session = await AdminSessions.findOne({ username: username });
        if (session)
            await AdminSessions.remove({ username: username });
        return res.json({ status: true, msg: "Logged out" });
    } catch (ex) {
        next(ex);
    }

};
