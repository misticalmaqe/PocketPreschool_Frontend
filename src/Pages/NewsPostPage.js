import { useState, useContext } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

//--------------COMPONENTS--------------//
import PostHeader from '../Components/PostHeader';
import apiRequest from '../Api';
import { UserContext } from '../Provider/UserProvider';

const NewsPostPage = () => {
  //create states to upload items
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imgs, setImgs] = useState([]);
  const { setNewsLetters, setNewsImgs, user } = useContext(UserContext);
  const BEURL = process.env.REACT_APP_BE_URL;
  const STORAGE_KEY = 'newsImages/';

  const navigate = useNavigate();
  const location = '/home';

  //create apiRequest function to send all items to DB and firebase
  const sendData = async () => {
    try {
      //create function to upload news letter to database
      const sendNewsLetter = await apiRequest.post(`${BEURL}/newsletter`, {
        title: title,
        date: date || null,
        description: description,
        usersId: user.id,
      });

      // Upload images and get their download URLs
      const imgUrls = await Promise.all(
        imgs.map((img) => {
          const fullStorageRef = ref(storage, STORAGE_KEY + img.name);
          return uploadBytes(fullStorageRef, img).then((snapshot) =>
            getDownloadURL(fullStorageRef)
          );
        })
      );

      //get newsletter id from sendNewsLetter
      const newsLettersId = sendNewsLetter.data.id;
      //upload news letter imgs to db with newsletter id for each img
      const newNewsImgs = await apiRequest.post(`${BEURL}/newsletter/imgs`, {
        urls: imgUrls,
        newsLetterId: newsLettersId,
      });
      console.log(newNewsImgs.data);
      setNewsLetters((prevNewsLetters) => [...prevNewsLetters, sendNewsLetter]);
      setNewsImgs((prevNewsImgs) => [...prevNewsImgs, newNewsImgs]);
      setTitle('');
      setDate('');
      setDescription('');
      setImgs([]);
      navigate(location);
    } catch (err) {
      console.log('Error occurred:', err);
      // Handle error or display a message to the user
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    sendData();
  };

  return (
    <div className="bg-white h-screen text-adminText">
      <PostHeader input="Upload News Letter" navigateLoc={location} />
      <div className=" text-center w-full">
        <form onSubmit={handleFormSubmit}>
          <div className="text-left font-bold">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              placeholder="Title"
              className="px-[20px] w-full mt-[10px] h-10 bg-white placeholder-adminAccent focus:outline-none focus:border-none "
            />
            <hr className="mt-[10px] rounded-full border-[0.1em] border-adminText" />
            <textarea
              maxLength="255"
              name="texts"
              rows="10"
              value={description}
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="px-[20px] w-full mt-[10px] h-10 bg-white   placeholder-adminAccent focus:outline-none focus:border-none overflow-y-hidden break-words min-h-[150px]"
            />
            <hr className=" my-[10px] rounded-full border-[0.1em] border-adminText" />
            <div
              className="w-full flex flex-col
             items-center justify-center mt-[20px]"
            >
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className="p-2 bg-adminText text-adminBackground focus:outline-none focus:border-none rounded-xl m-[15px]"
              />
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  setImgs(selectedFiles);
                }}
                className="file-input bg-adminBackground text-adminText file-input-bordered border-adminText max-w-xs rounded-xl m-[15px] file-input-warning"
              />
            </div>
            <button
              type="POST"
              className="absolute top-8 right-7 h-6 bg-adminText text-white p-5 border-none rounded-xl cursor-pointer mb-2 flex items-center justify-center"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsPostPage;
