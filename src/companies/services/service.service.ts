import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UpdateServiceDto, CreateServiceDto } from '../dtos/services.dto';

@Injectable()
export class ServiceService {
  constructor(private config: ConfigService) {}
  private counter = 1;
  private services = [
    {
      id: 1,
      name: 'mechanic',
      description: 'the services for auto',
      isActive: false,
    },
  ];

  getId(id: number) {
    const service = this.services.find((x) => x.id === id);
    if (!service) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return service;
  }

  create(payload: CreateServiceDto) {
    console.log(payload);
    this.counter++;
    const service = {
      id: this.counter,
      ...payload,
    };
    this.services.push(service);
    return service;
  }
  update(id: number, payload: UpdateServiceDto) {
    const index = this.services.findIndex((x) => x.id === id);
    const serviceIn = this.services[index];
    const service = {
      ...serviceIn,
      ...payload,
    };
    return (this.services[index] = service);
  }
  delete(id: number) {
    const deleteService = this.services.findIndex((x) => x.id === id);
    if (deleteService === -1) {
      throw new NotFoundException('id not found');
    }
    const eliminated = this.services.splice(deleteService, 1);
    return eliminated;
  }
}
