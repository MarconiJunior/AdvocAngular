import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient } from "@angular/common/http";
import { AuthGuard } from "./auth/AuthGuard";
import { LoginService } from "./services/login.service";
import { AuthService } from "./auth/auth.service";

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [ AppComponent ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" }
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: "dynamic"
      }
    },
    provideHttpClient(),
    AuthGuard,
    LoginService,
    AuthService
  ]
})
export class AppModule {}
