const config={
    production:{

        //herock config에서 환경변수로 이거 setting하기
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        PORT: process.env.PORT
    },
    default: {
        SECRET: 'askdjfalksdfa',
        DATABASE: 'mongodb://localhost:27017/auth',
        PORT: 3000
    }
};


exports.get=function get(env){
    return config[env] || config.default
};

