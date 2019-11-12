import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
    }).compile();

    service = module.get<ClientService>(ClientService);
=======
import { ClientsService } from './client.service';

describe('ClientService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
>>>>>>> create-authentication-and-tree-routes
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
