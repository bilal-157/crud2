const username = process.env.DBUSER
const pass = process.env.DBPASSWORD

if (!username || !pass){
    throw Error("MIssing Credentials");
}

export const connectionStr = `mongodb+srv://${username}:${pass}@cluster0.uwt3w.mongodb.net/TODOAPP?retryWrites=true&w=majority&appName=Cluster0`;

export default connectionStr;
