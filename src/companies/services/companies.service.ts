import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos/companies.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject('API') private api: string,
    @Inject('testU') private test: string,
  ) {}
  private counter = 1;
  private companies: Company[] = [
    {
      id: 1,
      name: 'tomato',
      description: 'The best tomato',
      address: 'cra 25 N 18_04',
    },
  ];
  getAll() {
    return this.companies;
  }
  findId(id: number) {
    const find = this.companies.find((x) => x.id === id);
    if (!find) {
      throw new NotFoundException('product not found');
    }
    return find;
  }
  create(payload: CreateCompanyDto) {
    this.counter++;
    const newCompany = {
      id: this.counter,
      ...payload,
    };
    this.companies.push(newCompany);
    return newCompany;
  }
  update(id: number, payload: UpdateCompanyDto) {
    const company = this.findId(id);
    if (company) {
      const index = this.companies.findIndex((x) => x.id === id);
      this.companies[index] = {
        ...company,
        ...payload,
      };
      return this.companies[index];
    } else {
      return null;
    }
  }
  delete(id: number) {
    const deleteId = this.companies.findIndex((x) => x.id === id);
    if (deleteId === -1) {
      throw new NotFoundException('product not found');
    }
    const eliminated = this.companies.splice(deleteId, 1);
    return eliminated;
  }
  getProvider() {
    return `${this.api} ${this.test}`;
  }
}
