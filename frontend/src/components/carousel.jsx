/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./carousel.scss";
import { Pagination, EffectCoverflow } from "swiper/modules";
import PropTypes from "prop-types";
import MyCalendar from "./Schedule/Schedule";

const { VITE_BACKEND_URL } = import.meta.env;

function Carousel({ data, images }) {
  const [showMore, setShowMore] = useState(false);
  const [reservationDateTime, setReservationDateTime] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [dataCoach, setDataCoach] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const token = localStorage.getItem("token");
  const showAlert = () => {
    // eslint-disable-next-line no-alert
    alert("Vous devez vous connecter !");
  };

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/coach`);
        if (!response.ok) {
          throw new Error("Erreur réseau");
        }

        const result = await response.json();

        setDataCoach(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGym();
  }, []);

  const uploadReservation = async (item) => {
    try {
      const payload = JSON.parse(localStorage.getItem("user"));

      const isoDate = new Date(reservationDateTime);
      isoDate.setMinutes(
        reservationDateTime.getMinutes() -
          reservationDateTime.getTimezoneOffset()
      );

      const formattedDate = isoDate.toISOString().split("T")[0];

      // Log the data before sending the POST request
      const response = await fetch(`${VITE_BACKEND_URL}/api/user-gym`, {
        method: "POST",
        body: JSON.stringify({
          gym_id: item,
          user_id: payload.id,
          reservation_date: formattedDate,
          reservation_heure: selectedHour,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // eslint-disable-next-line no-restricted-syntax
        console.log("Réservation réussie !");
        window.scrollTo(0, 0);
        // eslint-disable-next-line no-alert
        alert("Réservation validée !");
      } else {
        console.error("Échec de la réservation !");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReservation = (item) => {
    uploadReservation(item);
  };

  // eslint-disable-next-line no-restricted-syntax
  console.log(dataCoach);

  const onDateTimeChange = (selectedDateTime) => {
    setReservationDateTime(selectedDateTime);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date ? new Date(date).toLocaleDateString("fr-FR", options) : "";
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleReservationClick = () => {
    setIsReservationOpen(true);
  };

  const handleCoachChange = (event) => {
    const coachId = parseInt(event.target.value, 10);
    const selectedCoachData = dataCoach.find((coach) => coach.id === coachId);
    setSelectedCoach(selectedCoachData);
  };

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
  };

  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
      initialSlide={2}
    >
      {data.map((item, index) => (
        <SwiperSlide key={item.id}>
          <img src={images[index]} alt={item.gym_name} />
          <div className="slide-content">
            <h3>
              {item.gym_name} / {item.city}
            </h3>
            {showMore && <text>{item.description}</text>}
            <div className="button-carousel">
              <button
                type="button"
                className="button-depliant"
                onClick={toggleShowMore}
              >
                {showMore ? "Réduire" : "En savoir plus"}
              </button>
              <button
                type="button"
                className="button-reserver"
                onClick={handleReservationClick}
                onMouseOver={() => {
                  if (!token) {
                    showAlert();
                  }
                }}
                onFocus={() => {
                  if (!token) {
                    showAlert();
                  }
                }}
                disabled={!token}
              >
                Réserver
              </button>
            </div>
          </div>
          {isReservationOpen && (
            <div className="coach-homepage">
              {dataCoach.length > 0 && (
                <>
                  <label htmlFor="coachSelect">Choisissez un coach :</label>
                  <select
                    id="coachSelect"
                    name="coachSelect"
                    onChange={handleCoachChange}
                  >
                    <option value="" disabled selected>
                      Sélectionnez un coach
                    </option>
                    {dataCoach.map((coach) => (
                      <option key={coach.id} value={coach.id}>
                        {coach.firstname} {coach.lastname}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          )}
          <div className="calendar-main">
            {isReservationOpen && (
              <div className="calendar-text">Choisissez une date :</div>
            )}
            <div className="calendar-homepage">
              {selectedCoach && (
                <MyCalendar
                  onDateTimeChange={onDateTimeChange}
                  onHourChange={handleHourChange}
                  isOpen={isReservationOpen}
                />
              )}
            </div>
          </div>
          {isReservationOpen && reservationDateTime && (
            <div className="reservation-price">
              <p>
                Vous avez choisi de réserver une séance de coaching avec{" "}
                <strong>
                  {selectedCoach.firstname} {selectedCoach.lastname}
                </strong>{" "}
                le <strong>{formatDate(reservationDateTime)} à </strong>
                <strong>{selectedHour}</strong> dans la salle{" "}
                <strong>
                  {item.gym_name} / {item.city}
                </strong>
                . Voulez-vous valider la réservation ?
              </p>
              <button
                type="button"
                className="button-validation"
                onClick={() => {
                  handleReservation(item.id);
                }}
              >
                Valider
              </button>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default Carousel;

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      gym_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
