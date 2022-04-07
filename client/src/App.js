import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Messenger from "./pages/messenger/Messenger";
import StoriesCreate from "./pages/stories/StoriesCreate";
import Stories from "./pages/stories/Stories";
import ImageViews from "./pages/imageViews/ImageViews";


function App() {
 const user = useSelector(state => state.user.currentUser)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/messager">
          <Messenger />
        </Route>
        <Route path="/stories/create">
          <StoriesCreate />
        </Route>
        <Route path="/stories">
          <Stories />
        </Route>
        <Route path="/image/:id">
           <ImageViews />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;