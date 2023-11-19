import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
declare var $: any; // jQuery

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(){
    
  }

  title = 'tinypet-app';
}
