import { useEffect, useContext } from 'react';
import { UserContext } from '../../Provider/UserProvider';
import apiRequest from '../../Api';

export function ClassActImgCarousel({ classActId }) {
  const BEURL = process.env.REACT_APP_BE_URL;
  const { classActivity, classActImgs, setClassActImgs } =
    useContext(UserContext);
  const id = classActId;

  //create function to get newsletters and imgs and put it inside state
  const getNewsImgs = async () => {
    //get all ids of class activities from global state
    const classActsIds = classActivity.map((ids) => ids.id);
    const newsImgsData = await apiRequest.get(
      `${BEURL}/classactivity/imgs/${classActsIds}`
    );
    setClassActImgs(newsImgsData.data);
  };

  //useEffect to initialize function to get data from BE
  useEffect(() => {
    getNewsImgs();
  }, []);

  return (
    <div className="carousel m-[10px] max-h-[200px]">
      {classActImgs.map((imgs) =>
        imgs.classActivityId === id ? (
          <div key={imgs.id} className="carousel-item">
            <img src={imgs.url} alt="img" className="" />
          </div>
        ) : (
          <></>
        )
      )}
    </div>
  );
}
