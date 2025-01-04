const username = process.env.USER
const pass = process.env.PASSWORD

if (!username || !pass){
    throw Error("MIssing Credentials");
}

export const connectionStr = `mongodb+srv://${username}:${pass}@cluster0.uwt3w.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0`;