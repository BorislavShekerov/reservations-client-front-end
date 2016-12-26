import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchInputField') searchInputFiled : ElementRef;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
     this.renderer.invokeElementMethod(this.searchInputFiled.nativeElement,    
    'focus');
  }

}
