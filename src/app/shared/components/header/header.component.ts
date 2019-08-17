import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() labelButton: string;
  @Input() redirectLink: string;
  @Input() showButton: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
