import { useEffect, useState } from 'react';
import api from '../api';

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

const Menu = ({ category }) => {
  const [posts, setPosts] = useState([]);

  console.log(category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/posts/?category=${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="menu">
      <h2>Other posts you may like</h2>
      {posts.map(post => (
        <div className="post" key={post.id}>
          <img src={post.img} alt="" />
          <h3>{post.title}</h3>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
