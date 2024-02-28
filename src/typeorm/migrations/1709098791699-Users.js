export class Users1709098791699 {
    async up(queryRunner) {
      await queryRunner.query(
        `
              ALTER TABLE users
              MODIFY COLUMN email VARCHAR(255) UNIQUE
          `
      );
      await queryRunner.query(`
          ALTER TABLE users
          MODIFY COLUMN grade VARCHAR(255) DEFAULT '고마운 분'
      `);
      await queryRunner.query(
        `
              ALTER TABLE users
              CHANGE createdAt createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          `
      );
      await queryRunner.query(`
      ALTER TABLE users
      MODIFY COLUMN point BIGINT DEFAULT 0;
  `);
    }
  
    async down(queryRunner) {
      await queryRunner.query();
    }
  }