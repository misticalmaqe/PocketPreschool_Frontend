import { useEffect, useContext } from 'react';
import { UserContext } from '../../Provider/UserProvider';
import axios from 'axios';

export function NewsImgCarousel({ newsLetterId }) {
  const BEURL = process.env.REACT_APP_BE_URL;
  const { newsImgs, setNewsImgs, user, isAdmin, authenticated } =
    useContext(UserContext);
  const id = newsLetterId;

  //create function to get newsletters and imgs and put it inside state
  const getNewsImgs = async () => {
    const newsImgsData = await axios.get(`${BEURL}/newsletter/imgs`, {
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    setNewsImgs(newsImgsData.data);
  };

  //useEffect to initialize function to get data from BE
  useEffect(() => {
    getNewsImgs();
  }, [user, isAdmin, authenticated, setNewsImgs]);

  return (
    <div className="carousel mx-[10px]">
      {newsImgs.map((imgs) =>
        imgs.newsLettersId === id ? (
          <div key={imgs.id} className="carousel-item max-h-[200px]">
            <img src={imgs.url} alt="img" className="max-h-[200px]" />
          </div>
        ) : (
          <></>
        )
      )}
    </div>
  );
}
