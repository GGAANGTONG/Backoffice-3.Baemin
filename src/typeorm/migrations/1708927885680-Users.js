export class Users1708927885680 {
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
  }

  async down(queryRunner) {
    await queryRunner.query();
  }
}
