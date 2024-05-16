import { connect as _connect } from "mongoose";

export const connectToDb = async () => {
  try {
    const connect = await _connect(process.env.CONNECTION_STRING);
    console.log('Connection à la base de données reussi',  connect.connection.name);
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
};
