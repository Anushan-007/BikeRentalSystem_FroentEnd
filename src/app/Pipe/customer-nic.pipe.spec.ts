import { CustomerNicPipe } from './customer-nic.pipe';

describe('CustomerNicPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomerNicPipe();
    expect(pipe).toBeTruthy();
  });
});
