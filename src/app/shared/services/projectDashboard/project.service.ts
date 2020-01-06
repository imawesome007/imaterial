import { Injectable } from '@angular/core';
//import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';
import { API } from '../../constants/configuration-constants';
import { ProjectDetails } from '../../models/project-details';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(
    private dataService: DataService
  ) { }

  getProjects(organizationId:Number,userId:Number) {
    return this.dataService.getRequest(API.PROJECTS(organizationId,userId)).then(res => {
        return res;
    });
  }

  getCategory() {
    return this.dataService.getRequestMaster(API.GETCATERGORY).then(res => {
        return res;
    });
  }

  // getProjectById(organizationId:Number,userId:Number,id:number) {
  //   return this.dataService.getRequest(API.PROJECTS(organizationId,userId),id).then(res => {
  //       return res;
  //   });
  // }

  addProjects(organizationId:Number,userId:Number,projectData: ProjectDetails) {
    return this.dataService.sendPostRequest(API.ADDPROJECT(organizationId,userId), projectData).then(res => {
        return res;
    });
  }
}
