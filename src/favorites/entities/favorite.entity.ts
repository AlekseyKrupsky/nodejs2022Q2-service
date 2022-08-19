import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('favorites')
export class FavoriteEntity {
  @Column({ primary: true })
  userId: string;

  @Column({ primary: true })
  favoriteItemId: string;

  @Column({ primary: true })
  favoriteType: string;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  user: UserEntity;
}
