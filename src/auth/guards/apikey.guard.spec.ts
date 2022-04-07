import { ApikeyGuard } from './apikey.guard';

describe('ApikeyGuard', () => {
  it('should be defined', () => {
    expect(new ApikeyGuard()).toBeDefined();
  });
});
