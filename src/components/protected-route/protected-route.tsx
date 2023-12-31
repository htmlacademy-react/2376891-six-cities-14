import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type ProtectedRouteProps = {
  authorizationStatus: AuthorizationStatus;
  requiredStatus: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function ProtectedRoute(props: ProtectedRouteProps): JSX.Element {
  const { authorizationStatus, requiredStatus, redirectTo, children } = props;

  return (
    authorizationStatus === requiredStatus ? children : <Navigate to={redirectTo} />
  );
}

export default ProtectedRoute;
