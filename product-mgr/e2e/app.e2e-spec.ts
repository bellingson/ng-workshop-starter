import { ProductMgrPage } from './app.po';

describe('product-mgr App', () => {
  let page: ProductMgrPage;

  beforeEach(() => {
    page = new ProductMgrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
