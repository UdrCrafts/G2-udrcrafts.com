import { Sequelize } from "sequelize";

const sequelize = new Sequelize("g2_crafts", "aman", "5688", {
  host: "localhost",
  dialect: "postgres",
});
export default sequelize;
