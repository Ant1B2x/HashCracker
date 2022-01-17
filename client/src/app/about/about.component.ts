import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  title: string = '';
  description: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.title = route.snapshot.data['title'];
    this.description = route.snapshot.data['description'];
  }

  ngOnInit(): void {
  }

}
