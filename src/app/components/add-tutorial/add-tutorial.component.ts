import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { Context } from 'remult';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial = this.context.for(Tutorial).create();
  submitted = false;

  constructor(private context: Context) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {

    this.tutorial.save()
      .then(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = this.context.for(Tutorial).create();
  }

}
