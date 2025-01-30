// Load environment variables
const username = process.env.DBUSER
const pass = process.env.DBPASSWORD

if (!username || !pass) {
    throw Error("Missing database credentials. Make sure to set DBUSER and DBPASSWORD environment variables");
}

// The connection string uses environment variables which are not committed to source control
// Make sure to:
// 1. Create a .env file locally with your database credentials
// 2. Add .env to .gitignore (already done)
// 3. Set up environment variables in your deployment platform
export const connectionStr = `mongodb+srv://${username}:${pass}@cluster0.uwt3w.mongodb.net/TODOAPP?retryWrites=true&w=majority&appName=Cluster0`;

export default connectionStr;
