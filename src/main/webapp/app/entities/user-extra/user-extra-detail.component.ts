import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { IPost, Post } from 'app/shared/model/post.model';
import { PostService } from 'app/entities/post';
import { AccountService } from '../../core/auth/account.service';
import { UserService } from '../../core/user/user.service';
import { IUser, User } from '../../core/user/user.model';
@Component({
  selector: 'jhi-user-extra-detail',
  templateUrl: './user-extra-detail.component.html',
  styleUrls: ['./user-extra-detail.scss']
})
export class UserExtraDetailComponent implements OnInit {
  userExtra: IUserExtra;
  userJhipster: User;
  posts: IPost[];
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected postService: PostService,
    protected userService: UserService,
    protected jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userExtra }) => {
      this.userExtra = userExtra;
    });

    this.postService
      .queryByUser(this.userExtra)
      .pipe(
        filter((mayBeOk: HttpResponse<IPost[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPost[]>) => response.body)
      )
      .subscribe((res: IPost[]) => (this.posts = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.userService
      .findById(this.userExtra.userId)
      .pipe(
        filter((mayBeOk: HttpResponse<User>) => mayBeOk.ok),
        map((response: HttpResponse<User>) => response.body)
      )
      .subscribe((res: User) => (this.userJhipster = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  previousState() {
    window.history.back();
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
