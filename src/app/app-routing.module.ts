import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'announce', loadChildren: './page/announcements/announcements.module#AnnouncementsPageModule' },
  { path: 'schedule', loadChildren: './page/schedule/schedule.module#SchedulePageModule' },
  { path: 'classes', loadChildren: './page/classes/classes.module#ClassesPageModule' },
  { path: 'chat-room', loadChildren: './page/chat-room/chat-room.module#ChatRoomPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
