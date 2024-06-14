import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { MatPaginator } from "@angular/material/paginator";

@NgModule({
  declarations: [ PagesComponent ],
  imports: [
    CommonModule,
    MatToolbarModule,
    PagesRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [
    MatPaginator
  ]
})
export class PagesModule {}
