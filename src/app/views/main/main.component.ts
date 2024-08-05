import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  public link: string = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.link = this.authService.getLoggedIn() ? '/choice': '/signup';
  }
}
