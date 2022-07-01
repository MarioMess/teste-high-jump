import mongoose, { Connection } from "mongoose";

export class ConfigDB {
   
  private static connection:Connection; 

   public static async dbConnection():Promise<Connection>{
      if(this.connection){ return this.connection }
      await this.createConnection(); 
      return this.connection;
   }

   private static async createConnection() {
      try {
         if (!this.connection) {
           console.log('setting client');
           await mongoose.connect('mongodb://localhost:27017/electronchallenge')
           console.log(this.connection);      
         }
       } catch(error) {
         console.log('error during connecting to mongo: ');
         console.error(error);
       }
   } 
}
