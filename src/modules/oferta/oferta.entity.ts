import {
  Column, Entity, PrimaryGeneratedColumn,
  ManyToOne, OneToMany, JoinColumn, Index
} from "typeorm";

import { ProfesorEntity } from "../profesor/profesor.entity";
import { AsignaturaEntity } from "../asignatura/asignatura.entity";
import { EstudianteTomaOfertaEntity } from "../estudiante/estudiante-toma-oferta.entity";
import { BloqueHorarioEntity } from "../bloque-horario/bloque-horario.entity";
import { PeriodoInscripcionEntity } from "../periodo-inscripcion/preiodo-inscripcion.entity";
import { CarreraEntity } from "../carrera/carrera.entity";

@Entity('oferta_entity')
export class OfertaEntity {

  @PrimaryGeneratedColumn()
  ID_oferta!: number;

  @Column({ type: 'enum', enum: ['C', 'T', 'L'] })
  tipo!: string;

  @Column({ nullable: true })
  grupo?: string;

  @Column()
  cupos!: number;

  @Column()
  hrs_semanales!: number;

  //@Column({ unsigned: true, nullable: true })
  //ID_profesor!: number;

  @ManyToOne(() => ProfesorEntity, (prof) => prof.clases, {
    nullable: true,
    //onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'ID_profesor' })
  profesor?: ProfesorEntity | null;

  @ManyToOne(() => AsignaturaEntity, (asig) => asig.ofertas)
  @JoinColumn({ name: 'ID_asignatura' })
  asignatura!: AsignaturaEntity;

  @ManyToOne(() => CarreraEntity, (c) => c.ofertas)
  @JoinColumn({ name: 'ID_carrera' })
  carrera!: CarreraEntity;

  @ManyToOne(() => PeriodoInscripcionEntity, (p) => p.ofertas)
  @JoinColumn({ name: 'ID_periodo' })
  periodo_inscripcion!: PeriodoInscripcionEntity;

  @OneToMany(() => BloqueHorarioEntity, (bh) => bh.oferta, {
    cascade: true
  })
  horarios!: BloqueHorarioEntity[];

  @OneToMany(() => EstudianteTomaOfertaEntity, (t) => t.oferta)
  tomada!: EstudianteTomaOfertaEntity[];

  @Column({
    type: 'enum',
    enum: ['BORRADOR', 'PUBLICADA'],
    default: 'BORRADOR'
  })
  estado!: string;
}