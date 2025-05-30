import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    this.log(this.onj);
  }

  private onj = {
    name: 'Kika',
    age: 20,
    gender: {
      male: true,
    },
  };

  log(obj: any) {
    console.log(this.onj);
  }
}
