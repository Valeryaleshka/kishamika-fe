import { computed, DestroyRef, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';
import { User } from './users.types';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiService = inject(ApiService);

  public getUsers(): Observable<User[]> {
    return this.apiService.get('users');
  }
}
