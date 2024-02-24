export class PostRefactoring1708697547969 {
  async up(queryRunner) {
    await queryRunner.query(
      `
            ALTER TABLE restaurant CHANGE
            rating rating TINYINT NULL
        `
    );
  }

  async down(queryRunner) {
    await queryRunner.query();
  }
}
