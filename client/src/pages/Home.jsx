import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api.js';

// const posts = [
//   {
//     id: 1,
//     title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, eum!',
//     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, totam accusantium eum excepturi voluptatibus officiis blanditiis laboriosam omnis eos ab. Omnis exercitationem rerum doloremque atque et in quo praesentium deleniti.',
//     img: 'https://images.pexels.com/photos/15021300/pexels-photo-15021300/free-photo-of-post-letter-boxes-outdoors.jpeg'
//   },
//   {
//     id: 1,
//     title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, eum!',
//     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, totam accusantium eum excepturi voluptatibus officiis blanditiis laboriosam omnis eos ab. Omnis exercitationem rerum doloremque atque et in quo praesentium deleniti.',
//     img: 'https://images.pexels.com/photos/17371732/pexels-photo-17371732/free-photo-of-village.jpeg'
//   },
//   {
//     id: 1,
//     title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, eum!',
//     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, totam accusantium eum excepturi voluptatibus officiis blanditiis laboriosam omnis eos ab. Omnis exercitationem rerum doloremque atque et in quo praesentium deleniti.',
//     img: 'https://images.pexels.com/photos/17136611/pexels-photo-17136611/free-photo-of-computer-on-a-desk-in-a-bedroom.jpeg'
//   },
//   {
//     id: 1,
//     title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, eum!',
//     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, totam accusantium eum excepturi voluptatibus officiis blanditiis laboriosam omnis eos ab. Omnis exercitationem rerum doloremque atque et in quo praesentium deleniti.',
//     img: 'https://images.pexels.com/photos/15021300/pexels-photo-15021300/free-photo-of-post-letter-boxes-outdoors.jpeg'
//   },
//   {
//     id: 1,
//     title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, eum!',
//     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, totam accusantium eum excepturi voluptatibus officiis blanditiis laboriosam omnis eos ab. Omnis exercitationem rerum doloremque atque et in quo praesentium deleniti.',
//     img: 'https://images.pexels.com/photos/15021300/pexels-photo-15021300/free-photo-of-post-letter-boxes-outdoors.jpeg'
//   }
// ];

const Home = () => {
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;

  // console.log(category);

  const getBlogBodyText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
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
          posts.map(post => (
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
