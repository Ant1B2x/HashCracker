import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ResultTypeService } from '../resulttype.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  passwordInput: string = '';
  displayResult: boolean = false;
  resultMessage: string = '';
  resultType: string = ResultTypeService.none;
  hashs = [
    { type: 'Blank', value: '' },
    { type: 'MD5', value: '' },
    { type: 'SHA1', value: '' },
    { type: 'SHA256', value: '' }
  ];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  addPassword(): void {
    this.httpService.addPassword(this.passwordInput).subscribe({
      next: (res) => {
        if (res['status'] === 200 || res['status'] === 201) {
          const data = res['body'];
          this.hashs = [
            { type: 'Blank', value: data!['password'] },
            { type: 'MD5', value: data!['passwordMD5'] },
            { type: 'SHA1', value: data!['passwordSHA1'] },
            { type: 'SHA256', value: data!['passwordSHA256'] }
          ];
        }
        this.displayResult = false;
      },
      error: (err) => {
        if (err['status'] === 406) {
          this.resultMessage = 'Please provide a password!';
        } else {
          this.resultMessage = 'Connectivity problem!';
        }
        this.resultType = ResultTypeService.warning;
        this.displayResult = true;
      }
    });
  }

}
