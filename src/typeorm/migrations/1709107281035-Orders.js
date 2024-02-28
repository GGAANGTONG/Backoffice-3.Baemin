export class Orders1709107281035 {
  async up(queryRunner) {
    await queryRunner.query(
      `
              ALTER TABLE orders
              ADD totalPrice bigint NOT NULL AFTER address
          `
    );
  }
  async down(queryRunner) {
    await queryRunner.query();
  }
}
