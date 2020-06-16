
import {
    Entity,
    PrimaryGeneratedColumn,
    ObjectIdColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["email"])
export class User {
    @ObjectIdColumn()
    id: number;

    @Column()
    // @Length(4, 20)
    email: string;

    @Column()
    // @Length(4, 100)
    password: string;

    @Column()
    // @IsNotEmpty()
    role: string;


    hashPassword() {
        console.log('hashing pass', this.password)
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        console.log(this.password)
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}












// import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";
//
// @Entity()
// export class User {
//
//     @ObjectIdColumn()
//     id: ObjectID;
//
//     @Column()
//     name: string;
//
//     @Column()
//     surname: string;
//
//     @Column()
//     email: string;
//
//     @Column()
//     phone: string;
//
//     @Column()
//     pass: string
//
//     @Column()
//     bookmarks: any
//
// }
