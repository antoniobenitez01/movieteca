import { AuthService } from "../../services/auth-service";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";

export const publicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication().pipe(
    map(isAuthenticated => {
      if (isAuthenticated){
        router.navigate(['/heroes']);
        return false;
      }else{
        return true;
      }
    })
  )
};
