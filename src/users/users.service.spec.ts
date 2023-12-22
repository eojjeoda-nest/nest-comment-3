import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserRequestDto } from './dto/request.dto';

const mockUserEntityRepository = () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UsersService;
  let userEntityRepository: MockRepository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserEntityRepository(),
        },
      ],
    }).compile();

    service = module.get(UsersService);
    userEntityRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userEntityRepository).toBeDefined();
  });

  describe('create()', () => {
    it('유저 생성, 성공', async () => {
      // given
      const data: CreateUserRequestDto = {
        userId: 'test',
        userPw: 'test1234',
      };

      const userEntityRepositoryFindOneSpy = jest
        .spyOn(userEntityRepository, 'findOne')
        .mockResolvedValue(undefined);

      // const userEntityRepositoryCreateSpy = jest.spyOn(
      //   userEntityRepository,
      //   'create',
      // );

      const userEntityRepositorySaveSpy = jest
        .spyOn(userEntityRepository, 'save')
        .mockResolvedValue({
          primaryUserId: 1,
          userId: 'test',
        });

      // when
      const result = await service.create(data);

      // then
      expect(result).toEqual({ primaryUserId: 1, userId: 'test' });
    });
    it('유저 실패', async () => {
      // given
      const data: CreateUserRequestDto = {
        userId: 'test',
        userPw: 'test1234',
      };

      const userEntityRepositoryFindOneSpy = jest
        .spyOn(userEntityRepository, 'findOne')
        .mockResolvedValue(new UserEntity());

      // try {
      //   //when
      //   const result = await service.create(data);
      // } catch (e) {
      //   //then
      //   expect(e).toEqual(new Error('이미 존재하는 유저입니다.'));
      // }

      // const result = await service.create(data)

      const result = async () => {
        await service.create(data);
      };

      expect(result).rejects.toThrowError(
        new Error('이미 존재하는 유저입니다.'),
      );

      expect(userEntityRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: { userId: data.userId },
      });
    });
  });
});
