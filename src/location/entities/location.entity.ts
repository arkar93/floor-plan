import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 3, nullable: false })
  building: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  number: string;

  @Column({ type: 'float', nullable: false })
  area: number;
}
