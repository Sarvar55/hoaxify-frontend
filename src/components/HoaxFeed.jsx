import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getHoaxes,
  getNewHoaxCount,
  getNewHoaxCountByUser,
  getNewHoaxes,
  getOldHoaxes,
} from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgres";
import HoaxView from "./HoaxView";
import { Spinner } from "./Spinner";

const HoaxFeed = () => {
  const [hoaxPage, setHoaxPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const [newHoaxCount, setNewHoaxCount] = useState(0);
  const { username } = useParams();
  /**ilk useEffect calistir calistikdan sonra ise loadHoaxes fonksiyonu calisri o fonksiyor stati degistiriri ve componetn yeniden render olur
   * o zaman gelir if e girer ve oldHoaxId ye degeri set eder
   */
  const { content, last, number } = hoaxPage;
  let oldHoaxId = 0;
  let fistHoaxId = 0;
  if (content.length > 0) {
    console.log("if ini icerisi");
    fistHoaxId = content[0].hoaxId;
    const lastIndex = content.length - 1; //ilk defa render oldugunda -1 oluyor
    oldHoaxId = content[lastIndex].hoaxId;
  }

  useEffect(() => {
    const getNewHoax = async () => {
      const response = await getNewHoaxCount(fistHoaxId, username);
      setNewHoaxCount(response.data.count);
      console.log(response);
    };
    let looper = setInterval(() => {
      getNewHoax();
    }, 5000);

    return () => {
      clearInterval(looper);
    };
  }, [fistHoaxId, username]);

  const path = username
    ? `/api/1.0/users/${username}/hoaxes?currentPage`
    : `/api/1.0/hoaxes/?currentPage`;

  const initLoadHoaxes = useApiProgress("get", path);

  const oldHoaxPath = username
    ? `/api/1.0/users/${username}/hoaxes/${oldHoaxId}`
    : `/api/1.0/hoaxes/${oldHoaxId}`;

  const loadOldHoaxesProgress = useApiProgress("get", oldHoaxPath, true);

  const loadNewHoaxesProgress = useApiProgress(
    "get",
    `/api/1.0/hoaxes/${fistHoaxId}?direction=`
  );

  const pathForNewHoaxs = username
    ? `/api/1.0/users/${username}/hoaxes/${fistHoaxId}?direction=after`
    : `/api/1.0/hoaxes/${fistHoaxId}?direction=after`;

  const loadNewHoaxesForUserProgress = useApiProgress("get", pathForNewHoaxs);

  useEffect(() => {
    console.log("useEffecct calistit");
    loadHoaxes();
  }, []);

  const loadHoaxes = async (page) => {
    // if (pendingApiCall) return; //bunu nrmal butonun disable ozellginde de vere bilirsik ama btn kullanmadgimiz icin div in de disable ozellgi olmadgigi icin burada
    //kontrol ediyoruz
    try {
      const response = await getHoaxes(username, page);
      console.log(response.data);
      setHoaxPage((prev) => {
        return {
          ...response.data,
          content: [...prev.content, ...response.data.content],
        };
      });
    } catch (e) {}
  };

  const onClickNewHoaxLoad = async () => {
    const response = await getNewHoaxes(fistHoaxId, username, "after");
    setHoaxPage((prev) => {
      return {
        ...prev,
        content: [...response.data, ...prev.content],
      };
    });
  };
  const onClickDelete = (hoaxId) => {
    setHoaxPage((prev) => {
      return {
        ...prev,
        content: prev.content.filter((hoax) => hoax.hoaxId != hoaxId),
      };
    });
  };

  const loadOldHoaxes = async () => {
    try {
      const response = await getOldHoaxes(oldHoaxId, username);
      console.log("loadOldHoax");
      setHoaxPage((prev) => ({
        ...response.data,
        content: [...prev.content, ...response.data.content],
      }));
    } catch (e) {}
  };

  if (hoaxPage.content.length == 0) {
    return (
      <div className="alert alert-secondary text-center">
        {initLoadHoaxes ? <Spinner /> : " There are no hoaxes"}
      </div>
    );
  }

  return (
    <div className="w-100">
      {newHoaxCount > 0 && (
        <div
          onClick={
            loadNewHoaxesProgress ? () => {} : () => onClickNewHoaxLoad()
          }
          className="alert alert-secondary text-center mb-1"
          style={{ cursor: loadNewHoaxesProgress ? "not-allowed" : "pointer" }}
        >
          {loadNewHoaxesProgress || loadNewHoaxesForUserProgress ? (
            <Spinner />
          ) : (
            "There are new hoax"
          )}
        </div>
      )}
      {content.map((hoax) => {
        return (
          <HoaxView key={hoax.hoaxId} hoax={hoax} hoaxDelete={onClickDelete} />
        );
      })}
      {!last && (
        <div
          className="alert alert-secondary"
          style={{ cursor: loadOldHoaxesProgress ? "not-allowed" : "pointer" }}
          onClick={loadOldHoaxesProgress ? () => {} : () => loadOldHoaxes()}
        >
          {loadOldHoaxesProgress ? <Spinner /> : "Load More"}
        </div>
      )}
    </div>
  );
};

export default HoaxFeed;
