import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  standalone : false,
  templateUrl: './layout-page.html',
  host: {
    style: "display:flex; align-items:center; justify-content:center; height:100vh; background-image:url('bg.jpg'); background-size:cover;"
  }
})
export class LayoutPageComponent {

}
