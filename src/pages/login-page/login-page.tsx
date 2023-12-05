import { useRef, FormEvent, MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { CityName, AppRoute } from '../../const';
import { getRandomCity } from '../../utils/common';
import { useAppDispatch } from '../../hooks';
import Logo from '../../components/logo/logo';
import { loginAction } from '../../store/api-actions';
import { setActiveCity } from '../../store/app-process/app-process';

function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const randomCity = getRandomCity(Object.values(CityName));

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const validEmail = new RegExp(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w+)$/);
      const validPass = new RegExp(/^(?=.*\d)(?=.*[a-z]).*$/);
      const isValidEmail = validEmail.test(loginRef.current.value);
      const isValidPass = validPass.test(passwordRef.current.value);

      if(isValidPass && isValidEmail) {
        dispatch(loginAction({
          email: loginRef.current.value,
          password: passwordRef.current.value
        }));
      }
    }
  };

  const handleCityClick = (evt: MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    dispatch(setActiveCity(randomCity));
    navigate(AppRoute.Root);
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>{'6 cities - Login'}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit} >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item" onClick={handleCityClick}>
              <Link className="locations__item-link" to="#">
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
