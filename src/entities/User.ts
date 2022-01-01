import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Char } from "./Char";

@Entity("users")
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @Column()
  is_active: boolean;

  @Column()
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Char, (char) => char.user)
  chars: Array<Char>;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
