import { element, by, ElementFinder } from 'protractor';

export class InvitationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-invitation div table .btn-danger'));
  title = element.all(by.css('jhi-invitation div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class InvitationUpdatePage {
  pageTitle = element(by.id('jhi-invitation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  invitedBySelect = element(by.id('field_invitedBy'));
  belongsToSelect = element(by.id('field_belongsTo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async invitedBySelectLastOption(): Promise<void> {
    await this.invitedBySelect.all(by.tagName('option')).last().click();
  }

  async invitedBySelectOption(option: string): Promise<void> {
    await this.invitedBySelect.sendKeys(option);
  }

  getInvitedBySelect(): ElementFinder {
    return this.invitedBySelect;
  }

  async getInvitedBySelectedOption(): Promise<string> {
    return await this.invitedBySelect.element(by.css('option:checked')).getText();
  }

  async belongsToSelectLastOption(): Promise<void> {
    await this.belongsToSelect.all(by.tagName('option')).last().click();
  }

  async belongsToSelectOption(option: string): Promise<void> {
    await this.belongsToSelect.sendKeys(option);
  }

  getBelongsToSelect(): ElementFinder {
    return this.belongsToSelect;
  }

  async getBelongsToSelectedOption(): Promise<string> {
    return await this.belongsToSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class InvitationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-invitation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-invitation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
