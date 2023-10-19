import { ActivatedRouteSnapshot, CanActivateFn, Route } from '@angular/router';
import { Role } from './app.config';

export function navGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const role = route.paramMap.get('role') as Role;
    return ['husbands', 'wives'].includes(role);
  };
}
