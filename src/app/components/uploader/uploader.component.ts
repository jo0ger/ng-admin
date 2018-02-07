import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: '[uploader]',
	templateUrl: './uploader.component.html',
	styles: [ './uploader.component.less' ]
})
export class UploaderComponent implements OnInit {

	_url: string;

	@Input() title: string;

	@Input() name: string;

	@Input()
	set url (val: string) {
		this._url = val;
	}

	get url (): string {
		return this._url;
	}

	@Output() onUpload = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {}

	change (info: { file }) {}

	select () {}

	upload () {}
}
