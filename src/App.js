import React, { Suspense, lazy } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import routes from './routes';

// import FeedbackOptions from './components/FeedbackOptions';
// import Statistics from './components/Statistics';
// import Section from './components/Section';
// import Notification from './components/Notification';
// import Container from './components/Container';

// const HomeView = lazy(() =>
//   import('./views/HomeView.js' /* webpackChunkName: "home-view" */),
// );

// const App = () => (
//   <>
//     <AppBar />

//     <Suspense fallback={<h1>Загружаем...</h1>}>
//       <Switch>
//         <Route exact path={routes.home} component={HomeView} />
//         <Route path={routes.authors} component={AuthorsView} />
//         <Route exact path={routes.books} component={BooksView} />
//         <Route path={routes.bookDetails} component={BookDetailsView} />
//         <Route component={NotFoundView} />
//       </Switch>
//     </Suspense>
//   </>
// );

// export default App;
