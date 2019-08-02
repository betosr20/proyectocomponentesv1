import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserExtra, UserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';

@Component({
  selector: 'jhi-user-extra-update',
  templateUrl: './user-extra-update.component.html'
})
export class UserExtraUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nickname: [],
    status: [],
    userId: []
  });

  constructor(protected userExtraService: UserExtraService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userExtra }) => {
      this.updateForm(userExtra);
    });
  }

  updateForm(userExtra: IUserExtra) {
    this.editForm.patchValue({
      id: userExtra.id,
      nickname: userExtra.nickname,
      status: userExtra.status,
      userId: userExtra.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userExtra = this.createFromForm();
    if (userExtra.id !== undefined) {
      this.subscribeToSaveResponse(this.userExtraService.update(userExtra));
    } else {
      this.subscribeToSaveResponse(this.userExtraService.create(userExtra));
    }
  }

  private createFromForm(): IUserExtra {
    return {
      ...new UserExtra(),
      id: this.editForm.get(['id']).value,
      nickname: this.editForm.get(['nickname']).value,
      status: this.editForm.get(['status']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
