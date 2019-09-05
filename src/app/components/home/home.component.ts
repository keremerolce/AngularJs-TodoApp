import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Key } from 'protractor';
import { callbackify } from 'util';
import { fn } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  data={
    pendings:[
      'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
    ],
    inProgress:[
      'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
    ],
    done:[
      'Get up',
    'Brush teeth',
    'Take a shower'
    ]
  };
  constructor() { }

  ngOnInit() {
    this.setItems();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        Object.keys(this.data).forEach((key) => {
                          localStorage.setItem(key,JSON.stringify(this.data[key]));
                        });
    }
  }

  addTodo(todo){
    //console.log(todo.value);
    this.data.pendings.push(todo.value);
    todo.value='';
    localStorage.setItem('pendings',JSON.stringify(this.data.pendings));
  }

  setItems(){
    Object.keys(this.data).forEach((key) => {
      if(!localStorage.getItem(key)){
        localStorage.setItem(key,JSON.stringify(this.data[key]));
      }else{
        this.data[key]=JSON.parse(localStorage.getItem(key));
      }
    });
    
    

  /*  if(!localStorage.getItem('inProgress')){
      localStorage.setItem('inProgress',JSON.stringify(this.inProgress));
    }else{
      this.inProgress=JSON.parse(localStorage.getItem('inProgress'));
    }



    if(!localStorage.getItem('done')){
      localStorage.setItem('done',JSON.stringify(this.done));
    }else{
      this.done=JSON.parse(localStorage.getItem('done'));
    }*/





    /*localStorage.setItem('pendings',JSON.stringify(this.pendings));
    localStorage.setItem('inProgress',JSON.stringify(this.inProgress));
    localStorage.setItem('done',JSON.stringify(this.done));*/
  }

}
