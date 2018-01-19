

const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        PORT: process.env.PORT
    },
    default: {
        SECRET: "dsajfkladsjklfa",
        DATABASE: "mongodb://localhost:27017/tgb_app",
        PORT: 3000
    }
};

exports.get=function get(env){
    return config[env] || config.default

    //HEROKU에 올리면 자동으로 production으로 됨
};