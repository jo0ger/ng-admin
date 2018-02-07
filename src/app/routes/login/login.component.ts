import { SettingsService } from '@delon/theme';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ApiService } from '@core/api/api.service';
import { environment } from '@env/environment';

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.less' ]
})
export class LoginComponent {

    form: FormGroup;
    error = '';
    loading = false;

    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private api: ApiService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
        this.form = fb.group({
            name: [null, [Validators.required]],
            password: [null, Validators.required],
            remember: [true]
        });
    }

    get name() { return this.form.controls.name; }
    get password() { return this.form.controls.password; }

    // endregion

    submit () {
        this.error = '';
        this.name.markAsDirty();
        this.password.markAsDirty();
        if (this.name.invalid || this.password.invalid) return;
				this.loading = true;
        this.api.login({
					name: this.name.value,
					password: this.password.value
        }).then(res => {
					this.loading = false
					if (res.success) {
						this.tokenService.set({
							time: +new Date,
							...res.data
						})
						this.router.navigate(['/'])
					}
				}).catch(() => {
					this.loading = false
				})
		}
}
