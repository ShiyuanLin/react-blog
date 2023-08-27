import { ChangeEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState<string>(state?.title || '');
  const [title, setTitle] = useState<string>(state?.description || '');
  const [file, setFile] = useState<File>();
  const [category, setCategory] = useState<string>(state?.category || '');

  console.log(value);

  const navigate = useNavigate();

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      const file = event.target.files[0];
      console.log('file', file);
      setFile(file);
    }
  }

  const upload = async (): Promise<string> => {
    try {
      const formData: FormData = new FormData();
      if (file) {
        formData.append('file', file);
        console.log('upload.file', file);
      }
      const res = await api.post('/upload', formData);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return '';
    }
  };

  const clickPublish = async (): Promise<void> => {
    const imgUrl: string = await upload();
    console.log('imgUrl', imgUrl, 'file', file);
    try {
      state
        ? await api.put(`/posts/${state.id}`, {
          title, description: value, category, img: file ? imgUrl : ''
        })
        : await api.post('/posts/', {
          title, description: value, category, img: file ? imgUrl : '', date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)}/>
        <div className="editorContainer">
        <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h2>Publish</h2>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input className="fileUpload" type="file" id='file' name='' onChange={handleFileInput}/>
          <label className="fileLabel" htmlFor="file">Upload image</label>
          <div className='buttons'>
            <button>Save as a draft</button>
            <button onClick={clickPublish}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h2>Category</h2>
          <div className="cat">
            <input type="radio" checked={category === 'daily'} name="cat" value="daily" id="daily" onChange={e => setCategory(e.target.value)}/>
            <label htmlFor="daily">Daily</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'coding'} name="cat" value="coding" id="coding" onChange={e => setCategory(e.target.value)}/>
            <label htmlFor="coding">Coding</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'technology'} name="cat" value="technology" id="technology" onChange={e => setCategory(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'bike'} name="cat" value="bike" id="bike" onChange={e => setCategory(e.target.value)}/>
            <label htmlFor="bike">Bike</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'outdoor'} name="cat" value="outdoor" id="outdoor" onChange={e => setCategory(e.target.value)}/>
            <label htmlFor="outdoor">Outdoor</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'food'} name="cat" value="food" id="food" onChange={e => setCategory(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
