import client from "./config";

const connectDatabase = async () => {
  await client.connect();
  console.log("Database connected!");
};

export default connectDatabase;
