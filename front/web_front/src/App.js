import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Contents from './components/Contents'
import Post from './components/Post/PostMain'
function App() {
  return (
    <div className="App">
      <Header />
      <Contents />
      <Post />
    </div>
  );
}

export default App;
