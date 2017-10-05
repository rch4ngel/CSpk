import { Message } from './message.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
})
export class MessageInputComponent implements OnInit {
    message: Message;

    constructor(private messageService: MessageService) {}
    
    onSubmit(form: NgForm) {
        if(this.message){
            // Edit
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(this.message)
                )
            this.message = null;
        } else {
            // Create
            const message = new Message(form.value.content, form.value.user);
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
        }
       
        form.resetForm();
    }

    onClear(form: NgForm){
        form.resetForm();
        this.message = null;
    }

    ngOnInit(){
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );
    }
}