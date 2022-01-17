import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../http.service';
import { ResultTypeService } from '../resulttype.service';

@Component({
  selector: 'app-cracker',
  templateUrl: './cracker.component.html',
  styleUrls: ['./cracker.component.css']
})
export class CrackerComponent implements OnInit {

  title: string = '';
  description: string = '';
  hashInput: string = '';
  displayResult: boolean = false;
  resultMessage: string = '';
  resultType: string = ResultTypeService.none;

  constructor(private router: Router, private route: ActivatedRoute, private httpService: HttpService) {
    this.title = route.snapshot.data['title'];
    this.description = route.snapshot.data['description'];
  }

  ngOnInit(): void {
  }

  checkhash(): void {
    this.httpService.checkHash(this.hashInput).subscribe({
      next: (res) => {
        if (res['status'] === 204) {
          this.resultMessage = 'No password found for this hash. You can keep your password! :)';
          this.resultType = ResultTypeService.success;
        } else if (res['status'] === 200) {
          const password = res['body'];
          this.resultMessage = `Password found: "${password}", please change it immediately!`;
          this.resultType = ResultTypeService.error;
        }
      },
      error: (err) => {
        if (err['status'] === 406) {
          this.resultMessage = 'Please provide a hash!';
        } else {
          this.resultMessage = 'Connectivity problem!';
        }
        this.resultType = ResultTypeService.warning;
      }
    });
    this.displayResult = true;
  }

}
