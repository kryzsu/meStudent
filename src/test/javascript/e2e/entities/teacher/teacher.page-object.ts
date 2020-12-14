import { element, by, ElementFinder } from 'protractor';

export class TeacherComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-teacher div table .btn-danger'));
  title = element.all(by.css('jhi-teacher div h2#page-heading span')).first();
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

export class TeacherUpdatePage {
  pageTitle = element(by.id('jhi-teacher-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  isaSelect = element(by.id('field_isa'));
  managesSelect = element(by.id('field_manages'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async isaSelectLastOption(): Promise<void> {
    await this.isaSelect.all(by.tagName('option')).last().click();
  }

  async isaSelectOption(option: string): Promise<void> {
    await this.isaSelect.sendKeys(option);
  }

  getIsaSelect(): ElementFinder {
    return this.isaSelect;
  }

  async getIsaSelectedOption(): Promise<string> {
    return await this.isaSelect.element(by.css('option:checked')).getText();
  }

  async managesSelectLastOption(): Promise<void> {
    await this.managesSelect.all(by.tagName('option')).last().click();
  }

  async managesSelectOption(option: string): Promise<void> {
    await this.managesSelect.sendKeys(option);
  }

  getManagesSelect(): ElementFinder {
    return this.managesSelect;
  }

  async getManagesSelectedOption(): Promise<string> {
    return await this.managesSelect.element(by.css('option:checked')).getText();
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

export class TeacherDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-teacher-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-teacher'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
