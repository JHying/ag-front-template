import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'src/app/interface/common';

@Component({
  selector: 'my-round-card',
  templateUrl: './round-card.component.html',
  styleUrls: ['./round-card.component.css']
})
export class RoundCardComponent implements OnInit {

  @Input() title: string;
  @Input() content: SelectItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
