import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomBreadcrumbsService } from 'src/utils/custom-breadcrumbs.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  _activatedRoute = inject(ActivatedRoute);
  _breadCrumsService = inject(CustomBreadcrumbsService);

  ngOnInit(): void {

    // this._activatedRoute.data.subscribe((data) => {
    //   // const BreadCrumbsLabel = data['breadcrumb'];
    //   // console.log(BreadCrumbsLabel);

    //   //this._breadCrumsService.setBreadcrumbs([BreadCrumbsLabel]);
    //   if(data && data['breadcrumb']){
    //     // this.b 
    //   }
    // });
  }
}
