import { Component, OnInit } from '@angular/core';
import { questions } from './data/questions';
import {IQuestion, IResponse, IUser} from './interfaces/main';
import {NgForm} from '@angular/forms';
import {CountingService} from './counting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private countingService: CountingService) {
  }
  questionsList: IQuestion[] = questions;
  currentUserID = '';
  currentUserEmail = '';
  currentUser: IUser[] = [];
  userFeedbacks: IResponse[] = [];
  ngOnInit(): void {
    this.currentUserID = Date.now().toString();
    this.currentUserEmail = `${this.currentUserID}@testingtime.com`;
    this.currentUser.push({
      email: this.currentUserEmail,
      id: this.currentUserID
    });
    const oldUsersList: IUser[] = JSON.parse(localStorage.getItem('listOfUsers') as string);
    if (oldUsersList && oldUsersList.length > 0) {
      const newUserList = [...oldUsersList, this.currentUser[0]];
      localStorage.setItem('listOfUsers', JSON.stringify(newUserList));
    } else {
      localStorage.setItem('listOfUsers', JSON.stringify(this.currentUser));
    }
  }
  submittedFeedback(formData: NgForm): void {
    Object.keys(formData.value).forEach((entry) => {
      this.userFeedbacks.push({
        userId: this.currentUserID,
        questionId: entry.split('_')[1],
        answeredIndex: formData.value[entry]
      });
    });
    const oldListOfFeedbacks: IResponse[] = JSON.parse(localStorage.getItem('listOfFeedbacks') as string);
    if (oldListOfFeedbacks && oldListOfFeedbacks.length > 0) {
      const newListOfFeedbacks = [...oldListOfFeedbacks, ...this.userFeedbacks];
      localStorage.setItem('listOfFeedbacks', JSON.stringify(newListOfFeedbacks));
    } else {
      localStorage.setItem('listOfFeedbacks', JSON.stringify(this.userFeedbacks));
    }
    window.location.reload();
  }
  orderTestUsers(): void {
    this.countingService.countUsers();
  }
  clearStorage(): void {
    this.countingService.clearLocalStorage();
  }
}
