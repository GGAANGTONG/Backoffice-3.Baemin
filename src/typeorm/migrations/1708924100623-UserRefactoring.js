export class UserRefactoring1708924100623 {
    async up(queryRunner) {

        // 4. 포인트의 기본값을 업데이트합니다.
        await queryRunner.query(`
            ALTER TABLE users
           CHANGE point point BIGINT DEFAULT 0;
        `);
    }
}