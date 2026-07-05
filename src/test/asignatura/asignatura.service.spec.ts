import { Test, TestingModule } from '@nestjs/testing';
import { AsignaturaService } from '../../modules/asignatura/asignatura.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AsignaturaEntity } from '../../modules/asignatura/asignatura.entity';
import { EstudianteService } from '../../modules/usuario/usuario.service';
import { CarreraTieneAsignaturaEntity } from '../../modules/carrera/carrera-tiene-asignatura.entity';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';
import { EstudianteTomaOfertaEntity } from '../../modules/usuario/estudiante-toma-oferta.entity';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';
import { NotFoundException } from '@nestjs/common';
import { CaracterAsignatura } from '../../modules/asignatura/asignatura-caracter.enum';

describe('AsignaturaService', () => {
  let service: AsignaturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {provide: AsignaturaService,
        useValue: {}},
        {provide: getRepositoryToken(AsignaturaEntity),
        useValue: {}},
        {provide: EstudianteService,
        useValue: {}},
        {provide: getRepositoryToken(CarreraTieneAsignaturaEntity),
        useValue: {}},
        {provide: getRepositoryToken(MatriculaEntity),
        useValue: {}},
        {provide: getRepositoryToken(CarreraEntity),
        useValue: {}},
        {provide: getRepositoryToken(EstudianteTomaOfertaEntity),
        useValue: {}},
        {provide: getRepositoryToken(UsuarioEntity),
        useValue: {}},
      ],
    }).compile();

    service = module.get<AsignaturaService>(AsignaturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('AsignaturaService', () => {
  let service: AsignaturaService;
  const asignaturaRepo = {
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    createQueryBuilder: jest.fn(),
  };
  const carreraRepo = {findOne: jest.fn()};
  const carreraTieneAsignaturaRepo = {
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };
  const matriculaRepo = {findOne: jest.fn()};
  const estudianteRepo = {findOne: jest.fn()};
  const estudianteOfertaRepo = {find: jest.fn()};
  const estudianteService = {buscarTomaPorAsignatura: jest.fn()};

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
        providers: [
            AsignaturaService,
            {provide:getRepositoryToken(AsignaturaEntity), useValue:asignaturaRepo},
            {provide:getRepositoryToken(UsuarioEntity),useValue:estudianteRepo},
            {provide:getRepositoryToken(CarreraTieneAsignaturaEntity),useValue:carreraTieneAsignaturaRepo},
            {provide:getRepositoryToken(MatriculaEntity),useValue:matriculaRepo},
            {provide:getRepositoryToken(CarreraEntity),useValue:carreraRepo},
            {provide:getRepositoryToken(EstudianteTomaOfertaEntity),useValue:estudianteOfertaRepo},
            {provide:EstudianteService,useValue:estudianteService}
        ]
    }).compile();
    service = module.get(AsignaturaService);
  });

  it('debería obtener una asignatura', async ()=>{
    asignaturaRepo.findOneBy.mockResolvedValue({
        ID_asignatura:1,
        nombre:"Álgebra"
    });
    const result = await service.getAsignatura(1);
    expect(result.nombre).toBe("Álgebra");
    expect(asignaturaRepo.findOneBy)
        .toHaveBeenCalledWith({
            ID_asignatura:1
        });
  });

  it('debería lanzar NotFound si no existe la asignatura', async ()=>{
    asignaturaRepo.findOneBy.mockResolvedValue(null);
    await expect(
        service.getAsignatura(1)
    ).rejects.toThrow(NotFoundException);
  });

  it('debería crear una asignatura', async ()=>{
    const dto={
        nombre:"Álgebra",
        creditos:5,
        caracter:CaracterAsignatura.ELECTIVA,
        hrs_presenciales:4,
        hrs_autonomo:2
    };
    asignaturaRepo.create.mockReturnValue(dto);
    asignaturaRepo.save.mockResolvedValue(dto);
    const result=await service.create(dto);
    expect(asignaturaRepo.create).toHaveBeenCalled();
    expect(asignaturaRepo.save).toHaveBeenCalled();
    expect(result.nombre).toBe("Álgebra");
  });

  it('debería eliminar una asignatura', async ()=>{
    asignaturaRepo.softDelete.mockResolvedValue({
        affected:1
    });
    await service.delete(1);
    expect(asignaturaRepo.softDelete).toHaveBeenCalledWith(1);
  });

  it('debería lanzar NotFound al eliminar una asignatura inexistente', async ()=>{
    asignaturaRepo.softDelete.mockResolvedValue({
        affected:0
    });
    await expect(
        service.delete(1)
    ).rejects.toThrow(NotFoundException);
  });

  it('debería actualizar una asignatura', async ()=>{
    asignaturaRepo.update.mockResolvedValue({
        affected:1
    });
    await service.update(1,{
        nombre:"Nuevo"
    });
    expect(asignaturaRepo.update).toHaveBeenCalled();
  });

  it('debería lanzar NotFound al actualizar una asignatura inexistente', async ()=>{
    asignaturaRepo.update.mockResolvedValue({
        affected:0
    });
    await expect(
        service.update(1,{})
    ).rejects.toThrow(NotFoundException);
  });
});
