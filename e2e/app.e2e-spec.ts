import { ReservationsClientFrontEndPage } from './app.po';

describe('reservations-client-front-end App', function() {
  let page: ReservationsClientFrontEndPage;

  beforeEach(() => {
    page = new ReservationsClientFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
