import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FileComponentsPage, FileDeleteDialog, FileUpdatePage } from './file.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('File e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fileComponentsPage: FileComponentsPage;
  let fileUpdatePage: FileUpdatePage;
  let fileDeleteDialog: FileDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Files', async () => {
    await navBarPage.goToEntity('file');
    fileComponentsPage = new FileComponentsPage();
    await browser.wait(ec.visibilityOf(fileComponentsPage.title), 5000);
    expect(await fileComponentsPage.getTitle()).to.eq('meStudentApp.file.home.title');
    await browser.wait(ec.or(ec.visibilityOf(fileComponentsPage.entities), ec.visibilityOf(fileComponentsPage.noResult)), 1000);
  });

  it('should load create File page', async () => {
    await fileComponentsPage.clickOnCreateButton();
    fileUpdatePage = new FileUpdatePage();
    expect(await fileUpdatePage.getPageTitle()).to.eq('meStudentApp.file.home.createOrEditLabel');
    await fileUpdatePage.cancel();
  });

  it('should create and save Files', async () => {
    const nbButtonsBeforeCreate = await fileComponentsPage.countDeleteButtons();

    await fileComponentsPage.clickOnCreateButton();

    await promise.all([
      fileUpdatePage.setTitleInput('title'),
      fileUpdatePage.setDataInput(absolutePath),
      fileUpdatePage.taskAttachedToSelectLastOption(),
      fileUpdatePage.courseAttachedToSelectLastOption(),
      fileUpdatePage.commentAttachedToSelectLastOption(),
    ]);

    expect(await fileUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await fileUpdatePage.getDataInput()).to.endsWith(fileNameToUpload, 'Expected Data value to be end with ' + fileNameToUpload);

    await fileUpdatePage.save();
    expect(await fileUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last File', async () => {
    const nbButtonsBeforeDelete = await fileComponentsPage.countDeleteButtons();
    await fileComponentsPage.clickOnLastDeleteButton();

    fileDeleteDialog = new FileDeleteDialog();
    expect(await fileDeleteDialog.getDialogTitle()).to.eq('meStudentApp.file.delete.question');
    await fileDeleteDialog.clickOnConfirmButton();

    expect(await fileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
