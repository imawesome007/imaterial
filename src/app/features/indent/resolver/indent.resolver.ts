import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

@Injectable()
export class IndentResolver implements Resolve<any> {
  constructor() //private projectService: ProjectService
  {}

  resolve() {
    // return this.projectService.getProjects(1,1).then(data => {
    //     console.log("wefrgthyjhgff" , data.message);
    //    return data.message;
    // });
  }
}
