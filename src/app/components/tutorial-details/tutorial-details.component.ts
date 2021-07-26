import { Component, OnInit } from '@angular/core';
import { Context } from 'remult';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  currentTutorial = this.context.for(Tutorial).create();
  message = '';

  constructor(
    private context: Context,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.params.id);
  }

  getTutorial(id: string): void {
    this.context.for(Tutorial).findId(id)
      .then(
        data => {
          this.currentTutorial = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {


    this.message = '';
    this.currentTutorial.published = status;
    this.currentTutorial.save()
      .then(
        response => {
          this.currentTutorial.published = status;
          console.log(response);
          this.message = 'The status was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateTutorial(): void {
    this.message = '';

    this.currentTutorial.save()
      .then(
        response => {
          console.log(response);
          this.message = 'This tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial(): void {
    this.currentTutorial.delete()
      .then(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }

}
