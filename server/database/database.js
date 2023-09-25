import mongoose from "mongoose";
const DBconnection = async () => {
  const DB_URL = `mongodb://killipramodh7:9390392507p@ac-lolyqpb-shard-00-00.kwkvj1g.mongodb.net:27017,ac-lolyqpb-shard-00-01.kwkvj1g.mongodb.net:27017,ac-lolyqpb-shard-00-02.kwkvj1g.mongodb.net:27017/?ssl=true&replicaSet=atlas-80uiv1-shard-0&authSource=admin&retryWrites=true&w=majority`;

  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    console.log("database connected successfully");
  } catch (error) {
    console.error("error while connecting with the database", error.message);
  }
};

export default DBconnection;
