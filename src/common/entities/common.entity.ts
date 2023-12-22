import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class CommonEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deletedAt: Date | null;
}
