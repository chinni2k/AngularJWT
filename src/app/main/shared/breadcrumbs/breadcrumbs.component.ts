
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
// Import your breadcrumb service if you have one
import { BreadCrumb } from './BreadCrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: BreadCrumb[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    //private breadcrumbService: CustomBreadcrumbsService // If you have a breadcrumb service
  ) {}

  ngOnInit(): void {
    // Subscribe to route changes and update breadcrumbs
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        // Optionally, update the breadcrumb trail in your breadcrumb service
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadCrumb[] = []
  ): BreadCrumb[] {
    debugger;
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url }); // Access breadcrumb data
    }

    return this.createBreadcrumbs(children[0], url, breadcrumbs); // Recursive call with the first child route
  }
}



// import { Component, OnInit, inject } from '@angular/core';

// import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { filter } from 'rxjs';
// import { CustomBreadcrumbsService } from 'src/utils/custom-breadcrumbs.service';

// @Component({
//   selector: 'app-breadcrumbs',
//   templateUrl: './breadcrumbs.component.html',
//   styleUrls: ['./breadcrumbs.component.css'],
// })
// export class BreadcrumbsComponent implements OnInit {
//   breadcrumbs: string[] = [];

//   _router = inject(Router);
//   _activatedRoute = inject(ActivatedRoute);
//   _breadCrumbsService = inject(CustomBreadcrumbsService);

//   constructor() {}

//   ngOnInit() {
//     this._router.events
//       .pipe(filter((event) => event instanceof NavigationEnd))
//       .subscribe(() => {
//         this.breadcrumbs = this.createBreadcrumbs(this._activatedRoute.root);
//         this._breadCrumbsService.setBreadcrumbs(this.breadcrumbs);
//       });
//   }

//   private createBreadcrumbs(
//     route: ActivatedRoute,
//     url: string = '',
//     breadcrumbs: string[]
//   ): any {
//     const children: ActivatedRoute[] = route.children;

//     if (children.length === 0) {
//       return breadcrumbs;
//     }
//     for (const child of children) {
//       const routeURL: string = child.snapshot.url
//         .map((segment) => segment.path)
//         .join('/');
//       if (routeURL !== '') {
//         url += `/${routeURL}`;
//       }
//       breadcrumbs.push(child.snapshot.data['breadcrumb']);
//       return this.createBreadcrumbs(children[0], url, breadcrumbs);
//     }
//   }
// }