import { MessageService } from './message.service';
import { Message } from './message.model';
import { Component, Input, Output } from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
    .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
    }
    .config {
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
    }
`]
})
export class MessageComponent {
    @Input() message: Message;

    constructor(private messageService: MessageService) {}

    onEdit() {
        this.messageService.editMessage(this.message)
    }

    onDelete(){
        this.messageService.deleteMessage(this.message)
            .subscribe(
                result => console.log(result)
            )
    }

    belongsTo(){
        return localStorage.getItem('userId') == this.message.userId;
    }
}