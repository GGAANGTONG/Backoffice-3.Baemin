export class Users1708928010248 {
  async up(queryRunner) {
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
