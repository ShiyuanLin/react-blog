import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api';
import { IPost } from '../../../shared/interface/blog';

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const category = useLocation().search;

  // console.log(category);

  const getBlogBodyText = (text: string) => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.body.textContent;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/posts${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="home">
      <div className="posts">
        {
          posts.map((post: IPost) => (
            <div className="post" id={post.id}>
              <div className="img">
                <img src={`../../server/uploads/${post.img}`} alt="" />
              </div>
              <div className="content">
                <Link to={`/post/${post.id}`}>
                  <h2>{ post.title }</h2>
                </Link>
                <p>{ getBlogBodyText(post.description) }</p>
                <button>Read more</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
