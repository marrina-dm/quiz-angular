import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../shared/services/test.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {PassTestResponseType} from "../../../../types/pass-test-response.type";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
  public result: string = '';
  public testId: number | string = '';

  constructor(private testService: TestService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.activatedRoute.queryParams.subscribe(param => {
        this.testId = param['id'];
        if (this.testId) {
          this.testService.getResult(this.testId, userInfo.userId)
            .subscribe((result: DefaultResponseType | PassTestResponseType) => {
              if ((result as DefaultResponseType).error !== undefined) {
                throw new Error((result as DefaultResponseType).message);
              }
              this.result = (result as PassTestResponseType).score + '/' + (result as PassTestResponseType).total;
              return;
            });
        }
      });
    }
  }
}
