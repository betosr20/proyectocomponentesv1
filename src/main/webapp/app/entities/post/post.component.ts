import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';
import { IPost, Post } from 'app/shared/model/post.model';
import { AccountService } from 'app/core';
import { PostService } from './post.service';
import { FormBuilder } from '@angular/forms';
import { CommentService } from '../comment';
import { IComment } from 'app/shared/model/comment.model';

@Component({
  selector: 'jhi-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  posts: IPost[];
  currentAccount: any;
  eventSubscriber: Subscription;
  isSaving: boolean;
  editForm = this.fb.group({
    id: [],
    comment: [],
    timestamp: [],
    post: []
  });
  constructor(
    protected postService: PostService,
    protected commentService: CommentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    private fb: FormBuilder
  ) {}

  loadAll() {
    this.postService
      .queryByUser()
      .pipe(
        filter((res: HttpResponse<IPost[]>) => res.ok),
        map((res: HttpResponse<IPost[]>) => res.body)
      )
      .subscribe(
        (res: IPost[]) => {
          this.posts = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPosts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPost) {
    return item.id;
  }

  registerChangeInPosts() {
    this.eventSubscriber = this.eventManager.subscribe('postListModification', response => this.loadAll());
  }

  save(comment: IComment) {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.commentService.create(comment));
  }
  saveComment(post: Post) {
    this.isSaving = true;
    const comment = this.createFromForm();
    post.comments.push(comment);
    this.subscribeToSaveResponse(this.commentService.createWithPost(comment, post.id));
  }

  previousState() {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.editForm.get(['comment']).setValue('');
    this.eventManager.broadcast({
      name: 'postListModification',
      content: 'Updated a post'
    });
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  private createFromForm(): IComment {
    return {
      ...new Comment(),
      id: this.editForm.get(['id']).value,
      comment: this.editForm.get(['comment']).value,
      timestamp: this.editForm.get(['timestamp']).value,
      post: this.editForm.get(['post']).value
    };
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
