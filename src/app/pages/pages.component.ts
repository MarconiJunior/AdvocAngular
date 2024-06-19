import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-page",
  templateUrl: "./pages.component.html",
  styleUrl: "./pages.component.scss"
})
export class PagesComponent implements OnInit {
  pageTitle: string = "Home";
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
    });
  }

  updatePageTitle(): void {
    const pageTitle = this.getPageTitle(this.router.url);
    this.pageTitle = pageTitle || "Home";
  }

  getPageTitle(url: string): string | null {
    switch (url) {
      case "/home":
        return "Home";
      case "/clients":
        return "Clientes";
      case "/users":
        return "Usuários";
      default:
        return null;
    }
  }

  isButtonDisabled(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([ "/login" ]);
  }

  openHomePage(): void {
    this.router.navigate([ "/home" ]);
  }

  openClientsPage(): void {
    this.router.navigate([ "/clients" ]);
  }

  openDocumentsPage(): void {
    this.router.navigate(["/documents"]);
  }
}
