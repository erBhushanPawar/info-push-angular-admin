import { BaseService } from './com/naigles/info-push/services/base.service';
import { appRoutes } from './com/naigles/info-push/models/app-routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NbThemeModule } from '@nebular/theme';
import { AppComponent } from './app.component';
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly

import { ThemeModule } from './@theme/theme.module';
import { CoreModule } from './@core/core.module';
import { CreateCategoryComponent } from './com/naigles/info-push/components/create-category/create-category.component';
import { CreateSnypseComponent } from './com/naigles/info-push/components/create-snypse/create-snypse.component';
import { HttpClientModule } from '@angular/common/http';
import { ListCategoriesComponent } from './com/naigles/info-push/components/list-categories/list-categories.component';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
  import * as  Cloudinary from 'cloudinary-core';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ListSnypseComponent } from './com/naigles/info-push/components/list-snypse/list-snypse.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCategoryComponent,
    CreateSnypseComponent,
    ListCategoriesComponent,
    ListSnypseComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    NgxDatatableModule,
    BrowserModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot() ,
    NbLayoutModule,
    NbSidebarModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'brainethic' })

  ],
  providers: [NbSidebarService, BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
