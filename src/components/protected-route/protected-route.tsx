import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type ProtectedRouteProps = {
  authorizationStatus: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function ProtectedRoute(props: ProtectedRouteProps): JSX.Element {
  const { authorizationStatus, redirectTo, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.NoAuth ? children : <Navigate to={redirectTo} />
  );
}

export default ProtectedRoute;
