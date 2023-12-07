import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  primaryUserId: number;

  // TODO: userId에 unique 제약조건 추가하면 자동으로 확인해주는지 확인
  @Column({ length: 20, unique: true })
  userId: string;

  @Column({ length: 20 })
  userPw: string;
}
