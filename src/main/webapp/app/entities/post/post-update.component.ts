import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPost, Post } from 'app/shared/model/post.model';
import { PostService } from './post.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';
import { AccountService } from '../../core/auth/account.service';

@Component({
  selector: 'jhi-post-update',
  templateUrl: './post-update.component.html'
})
export class PostUpdateComponent implements OnInit {
  isSaving: boolean;
  userExtra: IUserExtra;
  userextras: IUserExtra[];

  editForm = this.fb.group({
    id: [],
    tittle: [],
    text: [],
    status: [],
    timestamp: [],
    userExtra: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected postService: PostService,
    protected userExtraService: UserExtraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ post }) => {
      this.updateForm(post);
    });
    this.userExtraService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUserExtra[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUserExtra[]>) => response.body)
      )
      .subscribe((res: IUserExtra[]) => (this.userextras = res), (res: HttpErrorResponse) => this.onError(res.message));

    //Cargando la informacion del usuario que esta en sesion
    this.userExtraService.findByUserId(this.accountService.user.id).subscribe(user => {
      this.userExtra = user.body;
    });
  }

  updateForm(post: IPost) {
    this.editForm.patchValue({
      id: post.id,
      tittle: post.tittle,
      text: post.text,
      status: post.status,
      timestamp: post.timestamp,
      userExtra: post.userExtra
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const post = this.createFromForm();
    if (post.id !== undefined) {
      this.subscribeToSaveResponse(this.postService.update(post));
    } else {
      this.subscribeToSaveResponse(this.postService.create(post));
    }
  }

  private createFromForm(): IPost {
    return {
      ...new Post(),
      id: this.editForm.get(['id']).value,
      tittle: this.editForm.get(['tittle']).value,
      text: this.editForm.get(['text']).value,
      status: this.editForm.get(['status']).value,
      timestamp: this.editForm.get(['timestamp']).value,
      userExtra: this.userExtra
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPost>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserExtraById(index: number, item: IUserExtra) {
    return item.id;
  }
}
