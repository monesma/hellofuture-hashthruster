import schemas from './schema';
import mongoose from 'mongoose';

export default {
  connect: async () => {
    const db_connection_str = process.env.DB_URI || '';
    mongoose.connect(db_connection_str);
    const db = mongoose.connection;
    db.on(
      'error',
      console.error.bind(console, 'Conection to Mongo has failed.'),
    );
    db.once('open', () => {
      console.log('Successfully connected to Mongo');
    });
  },
  disconnect: async () => {
    await mongoose.disconnect();
  },
  schemas
};
