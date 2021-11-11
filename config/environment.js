const development= {
    name: 'development',
    db: 'cloudify1',
    mongo_username: 'cloudify',
    password: 'First_assignment'
}

const production= {
    name: process.env.ENV,
    db: process.env.CLOUDIFY_DB,
    mongo_username: process.env.CLOUDIFY_MONGO_USERNAME,
    password: process.env.CLOUDIFY_PASSWORD
}

module.exports= development;