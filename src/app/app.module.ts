import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FromOfComponent } from './pages/from-of/from-of.component';
import { IntervalTimerComponent } from './pages/interval-timer/interval-timer.component';
import { MapReduceFilterComponent } from './pages/map-reduce-filter/map-reduce-filter.component';
import { BoardComponent } from './pages/board/board.component';
import { DistinctOthersComponent } from './pages/distinct-others/distinct-others.component';
import { TimesComponent } from './pages/times/times.component';
import { MergeComponent } from './pages/merge/merge.component';
import { TakeComponent } from './pages/take/take.component';
import { PluckComponent } from './pages/pluck/pluck.component';
import { StartWithEndWithComponent } from './pages/start-with-end-with/start-with-end-with.component';
import { ErrorsComponent } from './pages/errors/errors.component';
import { AjaxComponent } from './pages/ajax/ajax.component';
import { FromFetchComponent } from './pages/from-fetch/from-fetch.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FromOfComponent,
    IntervalTimerComponent,
    MapReduceFilterComponent,
    BoardComponent,
    DistinctOthersComponent,
    TimesComponent,
    MergeComponent,
    TakeComponent,
    PluckComponent,
    StartWithEndWithComponent,
    ErrorsComponent,
    AjaxComponent,
    FromFetchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
