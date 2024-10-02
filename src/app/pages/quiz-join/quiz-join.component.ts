// import { Component, inject } from '@angular/core';
// import {MatInputModule} from '@angular/material/input';
// import {MatButtonModule} from '@angular/material/button';
// import { FormsModule } from '@angular/forms';
// import { TestService } from '../../services/test.service';


// @Component({
//   selector: 'app-quiz-join',
//   standalone: true,
//   imports: [MatInputModule,MatButtonModule,FormsModule],
//   templateUrl: './quiz-join.component.html',
//   styleUrl: './quiz-join.component.css'
// })
// export class QuizJoinComponent {
//   code!:string;
//   name!: string;

//   testservice=inject(TestService);
//   join(){
//       if (this.code && this.name){
//         this.testservice.getQuizByCode(this.code).subscribe((result) => {
//           let quiz=result[0];
//           let userQuiz:QuizeResult={
//             name:this.name,
//             quizId:quiz.id

//           }
//         });

//       }else{
//         //show some error
//       }
//   }


// }




import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';

interface QuizeResult {
  name: string;
  quizId: number;
}

@Component({
  selector: 'app-quiz-join',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './quiz-join.component.html',
  styleUrls: ['./quiz-join.component.css']
})
export class QuizJoinComponent {
  code!: string;
  name!: string;

  testservice = inject(TestService);
  router = inject(Router);

  join() {
    if (this.code && this.name) {
      this.testservice.getQuizByCode(this.code).subscribe((result) => {
        let quiz = result[0];
        let userQuiz: QuizeResult = {
          name: this.name,
          quizId: quiz.id
        };
        // Pass the correct variable userQuiz here
        this.testservice.joinQuiz(userQuiz).subscribe(response => {
          console.log(response);
          this.testservice.quizResult = response;
          this.router.navigateByUrl("/quiz-info");
        });
      });
    } else {
      // show some error
    }
  }
}
