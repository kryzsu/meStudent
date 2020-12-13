import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InvitationComponentsPage, InvitationDeleteDialog, InvitationUpdatePage } from './invitation.page-object';

const expect = chai.expect;

describe('Invitation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let invitationComponentsPage: InvitationComponentsPage;
  let invitationUpdatePage: InvitationUpdatePage;
  let invitationDeleteDialog: InvitationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Invitations', async () => {
    await navBarPage.goToEntity('invitation');
    invitationComponentsPage = new InvitationComponentsPage();
    await browser.wait(ec.visibilityOf(invitationComponentsPage.title), 5000);
    expect(await invitationComponentsPage.getTitle()).to.eq('meStudentApp.invitation.home.title');
    await browser.wait(ec.or(ec.visibilityOf(invitationComponentsPage.entities), ec.visibilityOf(invitationComponentsPage.noResult)), 1000);
  });

  it('should load create Invitation page', async () => {
    await invitationComponentsPage.clickOnCreateButton();
    invitationUpdatePage = new InvitationUpdatePage();
    expect(await invitationUpdatePage.getPageTitle()).to.eq('meStudentApp.invitation.home.createOrEditLabel');
    await invitationUpdatePage.cancel();
  });

  it('should create and save Invitations', async () => {
    const nbButtonsBeforeCreate = await invitationComponentsPage.countDeleteButtons();

    await invitationComponentsPage.clickOnCreateButton();

    await promise.all([invitationUpdatePage.invitedBySelectLastOption(), invitationUpdatePage.belongsToSelectLastOption()]);

    await invitationUpdatePage.save();
    expect(await invitationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await invitationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Invitation', async () => {
    const nbButtonsBeforeDelete = await invitationComponentsPage.countDeleteButtons();
    await invitationComponentsPage.clickOnLastDeleteButton();

    invitationDeleteDialog = new InvitationDeleteDialog();
    expect(await invitationDeleteDialog.getDialogTitle()).to.eq('meStudentApp.invitation.delete.question');
    await invitationDeleteDialog.clickOnConfirmButton();

    expect(await invitationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
