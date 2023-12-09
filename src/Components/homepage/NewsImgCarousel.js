import { useEffect, useContext } from 'react';
import { UserContext } from '../../Provider/UserProvider';
import apiRequest from '../../Api';

export function NewsImgCarousel({ newsLetterId }) {
  const BEURL = process.env.REACT_APP_BE_URL;
  const { newsImgs, setNewsImgs } = useContext(UserContext);
  const id = newsLetterId;

  //create function to get newsletters and imgs and put it inside state
  const getNewsImgs = async () => {
    const newsImgsData = await apiRequest.get(`${BEURL}/newsletter/imgs`);
    setNewsImgs(newsImgsData.data);
  };

  //useEffect to initialize function to get data from BE
  useEffect(() => {
    getNewsImgs();
  }, []);

  return (
    <div className="carousel mx-[10px] max-h-[200px]">
      {newsImgs.map((imgs) =>
        imgs.newsLettersId === id ? (
          <div key={imgs.id} className="carousel-item w-full">
            <img src={imgs.url} alt="img" className="h-full" />
          </div>
        ) : (
          <></>
        )
      )}
    </div>
  );
}
