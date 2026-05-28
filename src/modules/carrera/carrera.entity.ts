import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  Check,
  DeleteDateColumn,
} from 'typeorm';
import { CarreraTieneAsignaturaEntity } from './carrera-tiene-asignatura.entity';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { OfertaEntity } from '../oferta/oferta.entity';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Check(`char_length(nombre) >= 3`)
@Check(`char_length(facultad) >= 3`)
export class CarreraEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id_carrera!: number;

  @ApiProperty()
  @Index({ unique: true })
  @Column({ length: 100, nullable: false })
  nombre!: string;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  facultad!: string;

  @OneToMany(
    () => CarreraTieneAsignaturaEntity,
    (tiene) => tiene.carrera,
    {
      nullable: false,
    },
  )
  tiene!: CarreraTieneAsignaturaEntity[];

  @OneToMany(() => MatriculaEntity, (toma) => toma.carrera, {
    nullable: false,
  })
  matriculados!: MatriculaEntity[];

  @OneToMany(() => OfertaEntity, (oferta) => oferta.carrera)
  ofertas!: OfertaEntity[];

  @ApiProperty()
  @Column('int')
  duracion!: number;

  @ApiProperty()
  @Column('int')
  cupos!: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}