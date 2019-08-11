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
import { ITag } from 'app/shared/model/tag.model';
import { TagService } from 'app/entities/tag';
import { AccountService } from '../../core/auth/account.service';

@Component({
  selector: 'jhi-post-update',
  templateUrl: './post-update.component.html'
})
export class PostUpdateComponent implements OnInit {
  isSaving: boolean;
  userExtra: IUserExtra;
  userextras: IUserExtra[];

  tags: ITag[];

  editForm = this.fb.group({
    id: [],
    tittle: [],
    text: [],
    status: [],
    timestamp: [],
    userExtra: [],
    tags: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected postService: PostService,
    protected userExtraService: UserExtraService,
    protected tagService: TagService,
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
    this.tagService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITag[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITag[]>) => response.body)
      )
      .subscribe((res: ITag[]) => (this.tags = res), (res: HttpErrorResponse) => this.onError(res.message));

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
      userExtra: post.userExtra,
      tags: post.tags
    });
  }

  previousState() {
    //window.history.back();
  }

  save() {
    this.isSaving = true;
    const post = this.createFromForm();
    console.log(post);
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
      userExtra: this.userExtra,
      tags: this.editForm.get(['tags']).value
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

  trackTagById(index: number, item: ITag) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
