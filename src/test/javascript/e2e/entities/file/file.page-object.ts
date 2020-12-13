import { element, by, ElementFinder } from 'protractor';

export class FileComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-file div table .btn-danger'));
  title = element.all(by.css('jhi-file div h2#page-heading span')).first();
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

export class FileUpdatePage {
  pageTitle = element(by.id('jhi-file-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  dataInput = element(by.id('file_data'));

  taskAttachedToSelect = element(by.id('field_taskAttachedTo'));
  courseAttachedToSelect = element(by.id('field_courseAttachedTo'));
  commentAttachedToSelect = element(by.id('field_commentAttachedTo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
  }

  async taskAttachedToSelectLastOption(): Promise<void> {
    await this.taskAttachedToSelect.all(by.tagName('option')).last().click();
  }

  async taskAttachedToSelectOption(option: string): Promise<void> {
    await this.taskAttachedToSelect.sendKeys(option);
  }

  getTaskAttachedToSelect(): ElementFinder {
    return this.taskAttachedToSelect;
  }

  async getTaskAttachedToSelectedOption(): Promise<string> {
    return await this.taskAttachedToSelect.element(by.css('option:checked')).getText();
  }

  async courseAttachedToSelectLastOption(): Promise<void> {
    await this.courseAttachedToSelect.all(by.tagName('option')).last().click();
  }

  async courseAttachedToSelectOption(option: string): Promise<void> {
    await this.courseAttachedToSelect.sendKeys(option);
  }

  getCourseAttachedToSelect(): ElementFinder {
    return this.courseAttachedToSelect;
  }

  async getCourseAttachedToSelectedOption(): Promise<string> {
    return await this.courseAttachedToSelect.element(by.css('option:checked')).getText();
  }

  async commentAttachedToSelectLastOption(): Promise<void> {
    await this.commentAttachedToSelect.all(by.tagName('option')).last().click();
  }

  async commentAttachedToSelectOption(option: string): Promise<void> {
    await this.commentAttachedToSelect.sendKeys(option);
  }

  getCommentAttachedToSelect(): ElementFinder {
    return this.commentAttachedToSelect;
  }

  async getCommentAttachedToSelectedOption(): Promise<string> {
    return await this.commentAttachedToSelect.element(by.css('option:checked')).getText();
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

export class FileDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-file-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-file'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
