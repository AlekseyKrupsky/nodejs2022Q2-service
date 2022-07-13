import { Module } from '@nestjs/common';
import { InMemoryDBModule } from "../database/database.module";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";

@Module({
  imports: [InMemoryDBModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
