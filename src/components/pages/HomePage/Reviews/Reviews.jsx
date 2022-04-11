import React, { useEffect } from 'react';
import styles from './styles.module.css';
import kov from '../../../../assets/homepage/reviews/kov.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReview } from '../../../../redux/features/review';
import { fetchAllUser } from '../../../../redux/features/user';
import { buttonClasses } from '@mui/material'

const Reviews = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);

  const reviews = useSelector((state) => state.review.review);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReview());
  }, [dispatch]);

  return (
    <div className={styles.reviewsBlock}>
      <div className={styles.reviewsTitle}>Отзывы</div>
      <div className={styles.carousel}>
        {reviews.map((review) => {
          return (
            <div className={styles.carouselItem} key={review._id}>
              <img className={styles.kov} src={kov} alt="bg" />
              <div className={styles.reviewAvatar}>
                {users.map((user) => {
                  if (user._id === review.user) {
                    return (
                      <img
                        src={`http://localhost:3030/${user.image}`}
                        alt="avatar"
                        key={user._id}
                      />
                    );
                  }
                })}
              </div>
              <div className={styles.reviewInfo}>
                <div className={styles.userInfo}>
                  {`${review.firstName} ${review.lastName}, ${review.age} лет`}
                </div>
                <p>{review.text.substr(0, 300) + '...'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
