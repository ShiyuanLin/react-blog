import React, { useContext, useEffect, useState } from 'react';
import Edit from '../imgs/edit.png';
import Delete from '../imgs/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import api from '../api';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
// import DOMPurify from 'dompurify';

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();

  const postId = location.pathname.split('/')[2];

  console.log(location);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${postId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          {post?.userImage && <img src={post.userImage} alt="" />}
          <div className="infor">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username && <div className="edit">
            <Link to={'/write?edit=2'} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>}
        </div>
        <h2>{post?.title}</h2>
        <p>
          {post?.description}
        </p>

        {/* <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc)
          }}
        ></p> */}
      </div>
      <Menu category={post.category}/>
    </div>
  );
};

export default Single;
