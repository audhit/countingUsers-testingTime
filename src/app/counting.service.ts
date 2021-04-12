import { Injectable } from '@angular/core';
import {IResponse} from './interfaces/main';

@Injectable({
  providedIn: 'root'
})
export class CountingService {

  constructor() { }
  public countUsers(): void {
    const currentListOfFeedbacks: IResponse[] = JSON.parse(localStorage.getItem('listOfFeedbacks') as string);
    let targetUsers: string[] = [];
    const questionAnswerCombination: any = { 1: 1, 2: 0 }; // TODO: should be dynamic based on user input
    if (!currentListOfFeedbacks || currentListOfFeedbacks.length === 0) {
      alert('Sorry there is no feedback from any user');
      return;
    }
    const temp: any = currentListOfFeedbacks.reduce((r: any , { userId, questionId, answeredIndex }) => {
      r[userId] ??= 0;
      r[userId] += questionAnswerCombination[questionId] === answeredIndex;
      return r;
    }, {});
    targetUsers = Object
      .keys(temp)
      .filter((count => (k: string | number) => temp[k] === count)(Object.keys(questionAnswerCombination).length));
    if (targetUsers.length === 0) {
      alert('Sorry no test user to order who meets the criteria.');
    } else {
      alert('Number of users who use iPhone and travel by car is: ' + targetUsers.length);
    }
  }
  public clearLocalStorage(): void {
    const confirmed = confirm('Do you really want to clear the temporary data storage?');
    if (confirmed) {
      localStorage.clear();
    }
  }
}
