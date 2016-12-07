/* tslint:disable */
import { Input, Output, OnChanges, EventEmitter, Component } from '@angular/core';
import { Contracts, Tools, Service } from '../../shared/';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';



@Component({
	selector: 'upload',
	templateUrl: 'app/widgets/fileupload/upload.html',

})

export class UploadWidget implements OnChanges {
	@Output() complete = new EventEmitter();
	@Output() close = new EventEmitter();

	@Input() private url: string;
	@Input() private params: any;

	uploader: FileUploader;


	ngOnChanges() {
		if (this.url) {
			// let jquery  = require('jquery');
			// let url = this.url + '?' + jquery.param( this.params );
			let url = this.url;

			this.uploader = new FileUploader({
				url: url,
			});

			this.uploader.onCompleteAll = () => {
				 this.complete.emit();
			};
		}
	}

	onClose() {
 		this.close.emit();
	}
};
