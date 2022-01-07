import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Meet } from "./Meet";

@Entity("events")
export class Event {
  @PrimaryColumn({
    unique: true,
  })
  readonly id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  coldown: number;

  @Column()
  lvl_min: number;

  @Column()
  lvl_max: number;

  @Column()
  min_chars: number;

  @Column()
  max_chars: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Meet, (meet) => meet.event, { onDelete: "CASCADE" })
  meetings: Array<Meet>;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
